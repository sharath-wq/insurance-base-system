import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from './contact.entity';
import { ListContactRole } from '../../common/enums';

@Entity('policy_contact_role')
export class PolicyContactRole {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  contactID: Contact;

  @Column({ type: 'enum', enum: ListContactRole, nullable: true })
  role: ListContactRole;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  updateUser: Contact;
}
