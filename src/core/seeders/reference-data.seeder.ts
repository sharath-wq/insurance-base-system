import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdentityType } from '../entities/identity-type.entity';
import { Nationality } from '../entities/nationality.entity';
import { Occupation } from '../entities/occupation.entity';
import { Relation } from '../entities/relation.entity';
import { MaritalStatus } from '../entities/marital-status.entity';

@Injectable()
export class ReferenceDataSeeder {
  constructor(
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

  async seedAll(): Promise<void> {
    await this.seedIdentityTypes();
    await this.seedNationalities();
    await this.seedOccupations();
    await this.seedRelations();
    await this.seedMaritalStatuses();
  }

  async clearAndReseedAll(): Promise<void> {
    // Clear existing data
    await this.nationalityRepository.delete({});
    await this.relationRepository.delete({});
    await this.maritalStatusRepository.delete({});
    await this.occupationRepository.delete({});
    await this.identityTypeRepository.delete({});
    
    // Reseed with fresh data
    await this.seedIdentityTypes();
    await this.seedNationalities();
    await this.seedOccupations();
    await this.seedRelations();
    await this.seedMaritalStatuses();
  }

  private async seedIdentityTypes(): Promise<void> {
    const existingCount = await this.identityTypeRepository.count();
    if (existingCount > 0) return;

    const identityTypes = [
      { id: 1, name: 'National ID', created_date: new Date(), updated_date: new Date() },
      { id: 2, name: 'Passport', created_date: new Date(), updated_date: new Date() },
      { id: 3, name: 'Iqama', created_date: new Date(), updated_date: new Date() },
    ];

    for (const data of identityTypes) {
      const entity = this.identityTypeRepository.create(data);
      await this.identityTypeRepository.save(entity);
    }
  }

  private async seedNationalities(): Promise<void> {
    const existingCount = await this.nationalityRepository.count();
    if (existingCount > 0) return;

    const nationalities = [
      { code: 'SA', name_en: 'Saudi Arabia', name_ar: 'المملكة العربية السعودية', created_date: new Date(), updated_date: new Date() },
      { code: 'US', name_en: 'United States', name_ar: 'الولايات المتحدة', created_date: new Date(), updated_date: new Date() },
      { code: 'UK', name_en: 'United Kingdom', name_ar: 'المملكة المتحدة', created_date: new Date(), updated_date: new Date() },
      { code: 'IN', name_en: 'India', name_ar: 'الهند', created_date: new Date(), updated_date: new Date() },
      { code: 'India', name_en: 'India', name_ar: 'الهند', created_date: new Date(), updated_date: new Date() },
      { code: 'PK', name_en: 'Pakistan', name_ar: 'باكستان', created_date: new Date(), updated_date: new Date() },
    ];

    for (const data of nationalities) {
      const entity = this.nationalityRepository.create(data);
      await this.nationalityRepository.save(entity);
    }
  }

  private async seedOccupations(): Promise<void> {
    const existingCount = await this.occupationRepository.count();
    if (existingCount > 0) return;

    const occupations = [
      { code: '01', name_en: 'Engineer', name_ar: 'مهندس', created_date: new Date(), updated_date: new Date() },
      { code: '02', name_en: 'Doctor', name_ar: 'طبيب', created_date: new Date(), updated_date: new Date() },
      { code: '03', name_en: 'Teacher', name_ar: 'معلم', created_date: new Date(), updated_date: new Date() },
      { code: '04', name_en: 'Manager', name_ar: 'مدير', created_date: new Date(), updated_date: new Date() },
      { code: '05', name_en: 'Accountant', name_ar: 'محاسب', created_date: new Date(), updated_date: new Date() },
    ];

    for (const data of occupations) {
      const entity = this.occupationRepository.create(data);
      await this.occupationRepository.save(entity);
    }
  }

  private async seedRelations(): Promise<void> {
    const existingCount = await this.relationRepository.count();
    if (existingCount > 0) return;

    const relations = [
      { code: 'Empl', name_en: 'Employee', name_ar: 'موظف', created_date: new Date(), updated_date: new Date() },
      { code: 'Spou', name_en: 'Spouse', name_ar: 'زوج/زوجة', created_date: new Date(), updated_date: new Date() },
      { code: 'Chld', name_en: 'Child', name_ar: 'طفل', created_date: new Date(), updated_date: new Date() },
      { code: 'Prnt', name_en: 'Parent', name_ar: 'والد', created_date: new Date(), updated_date: new Date() },
      { code: 'Prt', name_en: 'Parent', name_ar: 'والد', created_date: new Date(), updated_date: new Date() },
    ];

    for (const data of relations) {
      const entity = this.relationRepository.create(data);
      await this.relationRepository.save(entity);
    }
  }

  private async seedMaritalStatuses(): Promise<void> {
    const existingCount = await this.maritalStatusRepository.count();
    if (existingCount > 0) return;

    const maritalStatuses = [
      { code: 'S', name_en: 'Single', name_ar: 'أعزب', created_date: new Date(), updated_date: new Date() },
      { code: 'M', name_en: 'Married', name_ar: 'متزوج', created_date: new Date(), updated_date: new Date() },
      { code: 'D', name_en: 'Divorced', name_ar: 'مطلق', created_date: new Date(), updated_date: new Date() },
      { code: 'W', name_en: 'Widowed', name_ar: 'أرمل', created_date: new Date(), updated_date: new Date() },
    ];

    for (const data of maritalStatuses) {
      const entity = this.maritalStatusRepository.create(data);
      await this.maritalStatusRepository.save(entity);
    }
  }
}
