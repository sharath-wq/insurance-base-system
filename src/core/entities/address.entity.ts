import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { State } from './state.entity';
import { Nationality } from './nationality.entity';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  address_line1: string;

  @Column({ type: 'varchar', nullable: true })
  address_line2: string;

  @Column({ type: 'varchar' })
  postal_code: string;

  @Column({ type: 'varchar', length: 225 })
  city: string;

  @ManyToOne(() => State)
  state: State;

  @ManyToOne(() => Nationality)
  nationality: Nationality;

  @Column({ type: 'varchar', length: 225, nullable: true })
  latitude: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  longitude: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
