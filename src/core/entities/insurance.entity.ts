import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Quote } from './quote.entity';
import { Status } from './status.entity';
import { PolicyLob } from './policy-lob.entity';
import { PolicyStatus } from './policy-status.entity';
import { Account } from './account.entity';
import { PaymentDetails } from './payment-details.entity';

@Entity('insurance')
export class Insurance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quote)
  quote: Quote;

  @ManyToOne(() => Status)
  status: Status;

  @ManyToOne(() => PolicyLob)
  lob: PolicyLob;

  @ManyToOne(() => PolicyStatus)
  policy_status: PolicyStatus;

  @ManyToOne(() => Account)
  account: Account;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  effective_date: Date;

  @Column({ type: 'date', nullable: true })
  expiry_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  premium_novat: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  vat: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  total_fee: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  total_discount: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  premium: number;

  @ManyToOne(() => PaymentDetails)
  payment_refference: PaymentDetails;

  @Column({ type: 'boolean', nullable: true })
  is_endorsement: boolean;

  @Column({ type: 'varchar', length: 225, nullable: true })
  endorsment_type: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
