import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { RatingDto } from '../dto/rating.dto';
import { extractPolicyAndMemberDetails } from '../utils/extract-functions';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from 'src/core/entities/quote.entity';
import { Person } from 'src/lobs/health/entities/person.entity';
import { Repository } from 'typeorm';
import { createPayload } from '../utils/create-functions';

@Injectable()
export class RatingService {
  constructor(
    private readonly httpService: HttpService,

    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,

    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async getRatingFromJarus(dto: RatingDto): Promise<any> {
    const quoteId = dto.quote_id;

    const url = `${process.env.JARUS_RATING_URL}/?ApplicationName=Arabian%20Shield&ObjectName=Rating&ObjectType=Ruleset`;

    const quote = await this.quoteRepository.findOne({
      where: {
        ID: Number(quoteId),
      },
    });

    if (!quote) {
      throw new HttpException('Quote not found', 404);
    }

    const members = await this.personRepository.find({
      where: {
        quote: {
          ID: Number(quoteId),
        },
      },
      relations: [
        'quote',
        'identity_type',
        'nationality',
        'occupation',
        'relation',
        'marital_status',
      ],
    });

    if (!members.length) {
      throw new HttpException('No member present in quote', 400);
    }

    const createPayloadInputs = {
      id: quoteId,
      ...quote,
      members,
    };

    const body = createPayload(createPayloadInputs);

    console.log('Rating request body:', JSON.stringify(body, null, 2));
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, {
          headers: {
            Authorization: `Bearer ${process.env.JARUS_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }),
      );

      const extracted = extractPolicyAndMemberDetails(response.data);

      // Update member premiums and quote premium in the database
      await this.updateMemberPremiums(quoteId, extracted.memberDetails);
      await this.updateQuotePremium(quoteId, extracted.policyDetails);

      return extracted;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || 'Unknown error';
      const status = error?.response?.status || 500;

      throw new HttpException(
        `Failed to fetch rating from Jarus: ${message}`,
        status,
      );
    }
  }

  private async updateMemberPremiums(
    quoteId: string,
    memberDetails: any[],
  ): Promise<void> {
    try {
      // Get all members for this quote
      const members = await this.personRepository.find({
        where: {
          quote: {
            ID: Number(quoteId),
          },
        },
        order: {
          id: 'ASC', // Ensure consistent ordering
        },
      });

      // Update each member's premium based on the rating response
      for (let i = 0; i < memberDetails.length && i < members.length; i++) {
        const memberDetail = memberDetails[i];
        const member = members[i];

        // Update premium and base_premium from the rating response
        await this.personRepository.update(
          { id: member.id },
          {
            premium: memberDetail.fullTermAmount,
            base_premium: memberDetail.base_premium,
            updated_date: new Date(),
          },
        );
      }
    } catch (error: any) {
      console.error('Failed to update member premiums:', error.message);
      // Don't throw error here to avoid breaking the rating response
      // Just log the error and continue
    }
  }

  private async updateQuotePremium(
    quoteId: string,
    policyDetails: any,
  ): Promise<void> {
    try {
      // Update the quote with the total premium amount and tax amount
      await this.quoteRepository.update(
        { ID: Number(quoteId) },
        {
          premiumAmt: policyDetails.fullTermAmount,
          taxAmt: policyDetails.totalTaxAmount || 0,
          updateDt: new Date(),
        },
      );
    } catch (error: any) {
      console.error('Failed to update quote premium:', error.message);
      // Don't throw error here to avoid breaking the rating response
      // Just log the error and continue
    }
  }
}
