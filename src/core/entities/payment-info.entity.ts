import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Policy } from './policy.entity';
import { Contact } from './contact.entity';
import { ListPaymentMode } from '../../common/enums';

@Entity('payment_info')
export class PaymentInfo {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  txnID: string;

  @Column({ type: 'date', nullable: true })
  paymentSchdDt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  paymentSchdAmt: number;

  @Column({ type: 'timestamp', nullable: true })
  txnDt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  txnAmt: number;

  @Column({ type: 'enum', enum: ListPaymentMode, nullable: true })
  paymentMode: ListPaymentMode;

  @ManyToOne(() => Policy, { nullable: true })
  policyID: Policy;

  @ManyToOne(() => Contact, { nullable: true })
  updateUser: Contact;
}
