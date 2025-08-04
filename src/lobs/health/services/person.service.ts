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

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
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

      const people: any[] = [];

      for (const record of json) {
        // Remove the reference code fields and just use basic data
        const { nationality, identity_type, occupation_code, relation, marital_status, ...basicData } = record;
        
        const person = this.personRepository.create({
          ...basicData,
          // Set quote_id as foreign key
          quote: { ID: Number(quote_id) },
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
