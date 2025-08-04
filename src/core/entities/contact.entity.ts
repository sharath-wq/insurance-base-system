import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Address } from './address.entity';
import { ListContactType } from '../../common/enums';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'enum', enum: ListContactType, nullable: true })
  type: ListContactType;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', nullable: true })
  entityName: string;

  @Column({ type: 'date', nullable: true })
  DOB: Date;

  @Column({ type: 'varchar', nullable: true })
  emailID1: string;

  @Column({ type: 'varchar', nullable: true })
  emailID2: string;

  @Column({ type: 'integer', nullable: true })
  mobNoCountryCd: number;

  @Column({ type: 'integer', nullable: true })
  mobNo: number;

  @Column({ type: 'integer', nullable: true })
  workNoCountryCd: number;

  @Column({ type: 'integer', nullable: true })
  workNo: number;

  @ManyToOne(() => Address, { nullable: true })
  billingAddr: Address;

  @ManyToOne(() => Address, { nullable: true })
  mailingAddr: Address;

  @ManyToOne(() => Address, { nullable: true })
  homeAddr: Address;

  @Column({ type: 'varchar', nullable: true })
  relationToPNI: string;

  @Column({ type: 'varchar', nullable: true })
  passportNo: string;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  updateUser: Contact;
}
