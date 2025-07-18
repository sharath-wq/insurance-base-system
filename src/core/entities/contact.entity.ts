import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Address } from './address.entity';

@Entity('contact')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  contact_type: string;

  @Column({ type: 'varchar', length: 255 })
  contact_role: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 0 })
  mobile: number;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'varchar', length: 225 })
  email: string;

  @Column({ type: 'varchar' })
  gender: string;

  @ManyToOne(() => Address)
  address: Address;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
