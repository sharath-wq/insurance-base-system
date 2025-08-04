import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from './contact.entity';
import { Agency } from './agency.entity';

@Entity('agent')
export class Agent {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  number: string;

  @ManyToOne(() => Contact, { nullable: true })
  contact: Contact;

  @ManyToOne(() => Agency, { nullable: true })
  agencyID: Agency;

  @ManyToOne(() => Contact, { nullable: true })
  updateUser: Contact;
}
