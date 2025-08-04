import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from '../../../core/entities/contact.entity';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  make: string;

  @Column({ type: 'varchar', nullable: true })
  vin: string;

  @Column({ type: 'varchar', nullable: true })
  model: string;

  @Column({ type: 'varchar', nullable: true })
  year: string;

  @Column({ type: 'varchar', nullable: true })
  licensePlate: string;

  @Column({ type: 'integer', nullable: true })
  weight: number;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Vehicle, { nullable: true })
  @JoinColumn({ name: 'basedOnID' })
  basedOnID: Vehicle;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;
}
