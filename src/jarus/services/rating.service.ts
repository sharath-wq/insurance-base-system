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

    const quote = this.quoteRepository.findOne({
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
}
