import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact)
  contact: Contact;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
