import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ListTravelReason, ListCountry } from '../../common/enums';

@Entity('trip')
export class Trip {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'enum', enum: ListTravelReason, nullable: true })
  purpose: ListTravelReason;

  @Column({ type: 'enum', enum: ListCountry, nullable: true })
  destCountry: ListCountry;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Trip, { nullable: true })
  @JoinColumn({ name: 'basedOnID' })
  basedOnID: Trip;
}
