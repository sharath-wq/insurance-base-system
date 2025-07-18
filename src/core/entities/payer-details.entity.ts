import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payer_details')
export class PayerDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  name: string;

  @Column({ type: 'varchar', length: 225 })
  email: string;

  @Column({ type: 'varchar', length: 225 })
  mobile: string;

  @Column({ type: 'varchar', length: 225 })
  customer_id: string;

  @Column({ type: 'integer' })
  source_id: number;

  @Column({ type: 'varchar' })
  additional_details: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
