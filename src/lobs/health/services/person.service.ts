import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Person } from '../entities/person.entity';
import { CreatePersonDto } from '../dtos/create-person.dto';
import { BulkCreateResponse } from 'src/types/bulk-create-response.interface';
import { csvBufferToJson } from 'src/utils/csv-buffer-to-json';
import { RatingService } from 'src/jarus/services/rating.service';
import { IdentityType } from 'src/core/entities/identity-type.entity';
import { Nationality } from 'src/core/entities/nationality.entity';
import { Occupation } from 'src/core/entities/occupation.entity';
import { Relation } from 'src/core/entities/relation.entity';
import { MaritalStatus } from 'src/core/entities/marital-status.entity';
import { Quote } from 'src/core/entities/quote.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(IdentityType)
    private identityTypeRepository: Repository<IdentityType>,
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
    @InjectRepository(Occupation)
    private occupationRepository: Repository<Occupation>,
    @InjectRepository(Relation)
    private relationRepository: Repository<Relation>,
    @InjectRepository(MaritalStatus)
    private maritalStatusRepository: Repository<MaritalStatus>,
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
    private readonly ratingService: RatingService,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(createPersonDto as any);
    const saved = await this.personRepository.save(person);
    return saved as unknown as Person;
  }

  async findAll(): Promise<Person[]> {
    return this.personRepository.find({
      relations: [
        'quote',
        'identity_type',
        'nationality',
        'occupation',
        'relation',
        'marital_status',
      ],
    });
  }

  async findAllByQuoteId(quoteId: string): Promise<Person[]> {
    return this.personRepository.find({
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
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({
      where: { id },
      relations: [
        'quote',
        'identity_type',
        'nationality',
        'occupation',
        'relation',
        'marital_status',
      ],
    });
    if (!person) {
      throw new NotFoundException(
        `Person with ID ${id} not found`,
      );
    }
    return person;
  }

  async update(id: number, updatePersonDto: CreatePersonDto): Promise<Person> {
    const person = await this.findOne(id);
    Object.assign(person, updatePersonDto);
    return this.personRepository.save(person);
  }

  async remove(id: number): Promise<void> {
    const person = await this.findOne(id);
    await this.personRepository.remove(person);
  }

  async bulkCreate(
    buffer: Buffer,
    quote_id: string,
  ): Promise<BulkCreateResponse> {
    try {
      const json = csvBufferToJson(buffer);
      const memberCount = json.length;

      // Get the quote first
      const quote = await this.quoteRepository.findOne({ where: { ID: Number(quote_id) } });
      if (!quote) {
        throw new BadRequestException(`Quote with ID ${quote_id} not found`);
      }

      const people: any[] = [];

      for (const record of json) {
        // Extract the reference code fields
        const { nationality, identity_type_id, occupation_code, relation, marital_status, ...basicData } = record;
        
        // Look up foreign key entities
        let identityType, nationalityRecord, occupation, relationRecord, maritalStatusRecord;
        
        if (identity_type_id) {
          identityType = await this.identityTypeRepository.findOne({ where: { id: identity_type_id } });
        }
        
        if (nationality) {
          nationalityRecord = await this.nationalityRepository.findOne({ where: { code: nationality } });
        }
        
        if (occupation_code) {
          occupation = await this.occupationRepository.findOne({ where: { code: occupation_code } });
        }
        
        if (relation) {
          relationRecord = await this.relationRepository.findOne({ where: { code: relation } });
        }
        
        if (marital_status) {
          maritalStatusRecord = await this.maritalStatusRepository.findOne({ where: { code: marital_status } });
        }
        
        const person = this.personRepository.create({
          ...basicData,
          // Set quote relationship and foreign key
          quote,
          quoteId: quote.ID,
          // Set other relationships and foreign keys
          identity_type: identityType,
          identityTypeId: identityType?.id,
          nationality: nationalityRecord,
          nationalityId: nationalityRecord?.id,
          occupation,
          occupationId: occupation?.id,
          relation: relationRecord,
          relationId: relationRecord?.id,
          marital_status: maritalStatusRecord,
          maritalStatusId: maritalStatusRecord?.id,
          insurance_id: `HEALTH-INS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          created_date: new Date(),
          updated_date: new Date(),
        } as any);

        people.push(person);
      }

      const result = await this.personRepository.save(people);

      return {
        members: result,
        memberCount,
      };
    } catch (err: any) {
      throw new BadRequestException(`Bulk create failed: ${err.message}`);
    }
  }

  async updatePersons(quote_id: string, offering: string): Promise<any> {
    await this.personRepository.update(
      { quote: { ID: Number(quote_id) } },
      { offering_code: offering },
    );

    const newRatingMembers = await this.ratingService.getRatingFromJarus({
      quote_id: quote_id,
    });

    return newRatingMembers;
  }
}
