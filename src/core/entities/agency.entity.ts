import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('agency')
export class Agency {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  number: string;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'primaryContact' })
  primaryContact: Contact;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;
}
