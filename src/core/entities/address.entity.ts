import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ListState, ListCountry } from '../../common/enums';
import { Contact } from './contact.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  addrLine1: string;

  @Column({ type: 'varchar', nullable: true })
  addrLine2: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'enum', enum: ListState, nullable: true })
  state: ListState;

  @Column({ type: 'varchar', nullable: true })
  postalCd: string;

  @Column({ type: 'enum', enum: ListCountry, nullable: true })
  country: ListCountry;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  longitude: number;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;
}
