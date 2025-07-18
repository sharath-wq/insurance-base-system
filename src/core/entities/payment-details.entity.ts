import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PayerDetails } from './payer-details.entity';
import { PaymentMethod } from '../../common/enums/payment-method.enum'; // Adjust path as needed

@Entity('payment_details')
export class PaymentDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PayerDetails)
  payer: PayerDetails;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  payment_method: PaymentMethod;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'varchar', length: 225, nullable: true })
  callback_url: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  currency: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  payment_status: string;

  @Column({ type: 'timestamp', nullable: true })
  payment_initiation_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  payment_completion_time: Date;

  @Column({ type: 'varchar', length: 225, nullable: true })
  transation_receipt: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
