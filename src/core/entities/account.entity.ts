import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IdentityType } from './identity-type.entity';
import { CustomerType } from './customer-type.entity';
import { Agent } from './agent.entity';
import { Contact } from './contact.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  account_id: number;

  @ManyToOne(() => IdentityType)
  identity_type: IdentityType;

  @Column({ type: 'date' })
  account_start_date: Date;

  @ManyToOne(() => CustomerType)
  customer_type: CustomerType;

  @ManyToOne(() => Agent)
  agent: Agent;

  @Column({ type: 'boolean' })
  is_blocked: boolean;

  @ManyToOne(() => Contact)
  contact: Contact;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
