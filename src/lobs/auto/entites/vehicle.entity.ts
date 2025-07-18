import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quote } from '../../../core/entities/quote.entity';
import { Driver } from '../../../core/entities/driver.entity';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quote)
  quote: Quote;

  @Column({ type: 'integer' })
  vin: number;

  @Column({ type: 'varchar', length: 225 })
  make: string;

  @Column({ type: 'varchar', length: 225 })
  model: string;

  @Column({ type: 'varchar', length: 225 })
  year: string;

  @Column({ type: 'varchar', length: 225 })
  licence_plate: string;

  @Column({ type: 'integer', nullable: true })
  class_id: number;

  @ManyToOne(() => Driver)
  drivers: Driver;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  effective_date: Date;

  @Column({ type: 'date', nullable: true })
  expiry_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  premium: number;

  @Column({ type: 'boolean', nullable: true })
  is_endorsement: boolean;

  @Column({ type: 'varchar', length: 225, nullable: true })
  endorsment_type: string;

  @Column({ type: 'integer' })
  insurance_id: number;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
