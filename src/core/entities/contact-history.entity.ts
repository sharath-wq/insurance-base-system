import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('contact_history')
export class ContactHistory {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  fieldChanged: string;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'contactID' })
  contactID: Contact;

  @Column({ type: 'varchar', nullable: true })
  oldValue: string;

  @Column({ type: 'varchar', nullable: true })
  newValue: string;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;
}
