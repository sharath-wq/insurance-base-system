import { IdentityType } from 'src/core/entities/identity-type.entity';
import { MaritalStatus } from 'src/core/entities/marital-status.entity';
import { Nationality } from 'src/core/entities/nationality.entity';
import { Occupation } from 'src/core/entities/occupation.entity';
import { Quote } from 'src/core/entities/quote.entity';
import { Relation } from 'src/core/entities/relation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('person')
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quote)
  quote: Quote;

  @Column({ type: 'integer' })
  identity_no: number;

  @Column({ type: 'varchar', length: 225 })
  emp_id: string;

  @Column({ type: 'varchar', length: 225 })
  emp_name: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'varchar', length: 255 })
  industry_type: string;

  @Column({ type: 'varchar', length: 255 })
  payment_method: string;

  @Column({ type: 'varchar', length: 255 })
  offering_code: string;

  @ManyToOne(() => IdentityType)
  identity_type: IdentityType;

  @Column({ type: 'varchar', length: 225 })
  name_en: string;

  @Column({ type: 'varchar', length: 225 })
  name_ar: string;

  @Column({ type: 'varchar', length: 225 })
  email: string;

  @Column({ type: 'numeric', precision: 10 })
  mobile: number;

  @ManyToOne(() => Nationality)
  nationality: Nationality;

  @ManyToOne(() => Occupation)
  occupation: Occupation;

  @ManyToOne(() => Relation)
  relation: Relation;

  @ManyToOne(() => MaritalStatus)
  marital_status: MaritalStatus;

  @Column({ type: 'varchar', length: 225 })
  gender_code: string;

  @Column({ type: 'numeric' })
  company_id: number;

  @Column({ type: 'varchar', length: 225 })
  member_type: string;

  @Column({ type: 'varchar', length: 225 })
  member_status: string;

  @Column({ type: 'integer', nullable: true })
  parent_refference: number;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  effective_date: Date;

  @Column({ type: 'date', nullable: true })
  expiry_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  premium: number;

  @Column({ type: 'integer', nullable: true })
  class_id: number;

  @Column({ type: 'varchar', nullable: true })
  mdf_status: string;

  @Column({ type: 'boolean', nullable: true })
  is_endorsement: boolean;

  @Column({ type: 'varchar', length: 225, nullable: true })
  endorsment_type: string;

  @Column({ type: 'varchar', length: 225 })
  insurance_id: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;

  @Column('decimal', { nullable: true })
  base_premium: number;
}
