import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'contact' })
  contact: Contact;

  @ManyToOne(() => Agency, { nullable: true })
  @JoinColumn({ name: 'agencyID' })
  agencyID: Agency;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;
}
