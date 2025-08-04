import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PolicyContactRole } from './policy-contact-role.entity';
import { Trip } from './trip.entity';
import { Agent } from './agent.entity';
import { Contact } from './contact.entity';
import { 
  ListPolicyStatus, 
  ListProduct, 
  ListTransactionType, 
  ListPaymentScheduleType 
} from '../../common/enums';

@Entity('policy')
export class Policy {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  QuoteNo: string;

  @Column({ type: 'date', nullable: true })
  startDt: Date;

  @Column({ type: 'date', nullable: true })
  endDt: Date;

  @Column({ type: 'date', nullable: true })
  quoteDt: Date;

  @Column({ type: 'date', nullable: true })
  issueDt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  premiumAmt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxAmt: number;

  @Column({ type: 'enum', enum: ListPolicyStatus, nullable: true })
  status: ListPolicyStatus;

  @ManyToOne(() => PolicyContactRole, { nullable: true })
  @JoinColumn({ name: 'holderID' })
  holderID: PolicyContactRole;

  @Column({ type: 'date', nullable: true })
  firstStartDt: Date;

  @Column({ type: 'date', nullable: true })
  rejectDt: Date;

  @Column({ type: 'varchar', nullable: true })
  rejectReason: string;

  @ManyToOne(() => Trip, { nullable: true })
  @JoinColumn({ name: 'tripID' })
  tripID: Trip;

  @Column({ type: 'varchar', nullable: true })
  Number: string;

  @Column({ type: 'enum', enum: ListProduct, nullable: true })
  productID: ListProduct;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @Column({ type: 'enum', enum: ListTransactionType, nullable: true })
  txnTypeID: ListTransactionType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  surchargeAmt: number;

  @Column({ type: 'enum', enum: ListPaymentScheduleType, nullable: true })
  paymentSchdTypeID: ListPaymentScheduleType;

  @ManyToOne(() => Agent, { nullable: true })
  @JoinColumn({ name: 'agent' })
  agent: Agent;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;

  @ManyToOne(() => Policy, { nullable: true })
  @JoinColumn({ name: 'basedOnID' })
  basedOnID: Policy;
}
