import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { Quote } from 'src/core/entities/quote.entity';
import { IdentityType } from 'src/core/entities/identity-type.entity';
import { Nationality } from 'src/core/entities/nationality.entity';
import { Occupation } from 'src/core/entities/occupation.entity';
import { Relation } from 'src/core/entities/relation.entity';
import { MaritalStatus } from 'src/core/entities/marital-status.entity';
import { BulkCreateResponse } from 'src/types/bulk-create-response.interface';
import { csvBufferToJson } from 'src/utils/csv-buffer-to-json';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
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
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const {
      quote_id,
      identity_type_id,
      nationality_id,
      occupation_id,
      relation_id,
      marital_status_id,
      ...personData
    } = createPersonDto;

    // Fetch related entities
    const quote = await this.quoteRepository.findOne({
      where: { id: quote_id },
    });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${quote_id} not found`);
    }

    const identityType = await this.identityTypeRepository.findOne({
      where: { id: identity_type_id },
    });
    if (!identityType) {
      throw new NotFoundException(
        `IdentityType with ID ${identity_type_id} not found`,
      );
    }

    const nationality = await this.nationalityRepository.findOne({
      where: { id: nationality_id },
    });
    if (!nationality) {
      throw new NotFoundException(
        `Nationality with ID ${nationality_id} not found`,
      );
    }

    const occupation = await this.occupationRepository.findOne({
      where: { id: occupation_id },
    });
    if (!occupation) {
      throw new NotFoundException(
        `Occupation with ID ${occupation_id} not found`,
      );
    }

    const relation = await this.relationRepository.findOne({
      where: { id: relation_id },
    });
    if (!relation) {
      throw new NotFoundException(`Relation with ID ${relation_id} not found`);
    }

    const maritalStatus = await this.maritalStatusRepository.findOne({
      where: { id: marital_status_id },
    });
    if (!maritalStatus) {
      throw new NotFoundException(
        `MaritalStatus with ID ${marital_status_id} not found`,
      );
    }

    const person = this.personRepository.create({
      ...personData,
      quote,
      identity_type: identityType,
      nationality,
      occupation,
      relation,
      marital_status: maritalStatus,
      insurance_id: `HEALTH-INS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      created_date: new Date(),
      updated_date: new Date(),
    });

    return this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return this.personRepository.find({
      where: { insurance_id: Like('HEALTH-INS%') },
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
      where: { id, insurance_id: Like('HEALTH-INS%') },
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
        `Person with ID ${id} not found in health LOB`,
      );
    }
    return person;
  }

  async update(id: number, updatePersonDto: CreatePersonDto): Promise<Person> {
    const person = await this.findOne(id);

    const {
      quote_id,
      identity_type_id,
      nationality_id,
      occupation_id,
      relation_id,
      marital_status_id,
      ...updateData
    } = updatePersonDto;

    if (quote_id) {
      const quote = await this.quoteRepository.findOne({
        where: { id: quote_id },
      });
      if (!quote) {
        throw new NotFoundException(`Quote with ID ${quote_id} not found`);
      }
      person.quote = quote;
    }

    if (identity_type_id) {
      const identityType = await this.identityTypeRepository.findOne({
        where: { id: identity_type_id },
      });
      if (!identityType) {
        throw new NotFoundException(
          `IdentityType with ID ${identity_type_id} not found`,
        );
      }
      person.identity_type = identityType;
    }

    if (nationality_id) {
      const nationality = await this.nationalityRepository.findOne({
        where: { id: nationality_id },
      });
      if (!nationality) {
        throw new NotFoundException(
          `Nationality with ID ${nationality_id} not found`,
        );
      }
      person.nationality = nationality;
    }

    if (occupation_id) {
      const occupation = await this.occupationRepository.findOne({
        where: { id: occupation_id },
      });
      if (!occupation) {
        throw new NotFoundException(
          `Occupation with ID ${occupation_id} not found`,
        );
      }
      person.occupation = occupation;
    }

    if (relation_id) {
      const relation = await this.relationRepository.findOne({
        where: { id: relation_id },
      });
      if (!relation) {
        throw new NotFoundException(
          `Relation with ID ${relation_id} not found`,
        );
      }
      person.relation = relation;
    }

    if (marital_status_id) {
      const maritalStatus = await this.maritalStatusRepository.findOne({
        where: { id: marital_status_id },
      });
      if (!maritalStatus) {
        throw new NotFoundException(
          `MaritalStatus with ID ${marital_status_id} not found`,
        );
      }
      person.marital_status = maritalStatus;
    }

    Object.assign(person, updateData, { updated_date: new Date() });

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
      const quote = await this.quoteRepository.findOne({
        where: { id: +quote_id },
      });
      if (!quote) {
        throw new NotFoundException(`Quote with ID ${quote_id} not found`);
      }

      const json = csvBufferToJson(buffer);
      const memberCount = json.length;

      const people: Person[] = [];

      for (const record of json) {
        const [identityType, nationality, occupation, relation, maritalStatus] =
          await Promise.all([
            this.identityTypeRepository.findOne({
              where: { id: record.identity_type },
            }),
            this.nationalityRepository.findOne({
              where: { id: record.nationality },
            }),
            this.occupationRepository.findOne({
              where: { id: record.occupation_code },
            }),
            this.relationRepository.findOne({
              where: { id: record.relation },
            }),
            this.maritalStatusRepository.findOne({
              where: { id: record.marital_status },
            }),
          ]);

        if (
          !identityType ||
          !nationality ||
          !occupation ||
          !relation ||
          !maritalStatus
        ) {
          throw new BadRequestException(
            `Invalid reference fields in record: ${JSON.stringify(record)}`,
          );
        }

        const now = new Date();

        console.log(record, 'this is the record');

        const person = this.personRepository.create({
          // Basic fields with fallbacks
          ...record,

          // Related entities
          quote,
          identity_type: identityType,
          nationality,
          occupation,
          relation,
          marital_status: maritalStatus,

          // System-generated
          insurance_id: `HEALTH-INS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          created_date: now,
          updated_date: now,
        });

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

  async updatePersons(quote_id: string, offering: string): Promise<number> {
    const result = await this.personRepository.update(
      { quote: { id: Number(quote_id) } }, // ✅ cast to number
      { offering_code: offering },
    );

    return result.affected ?? 0;
  }
}
