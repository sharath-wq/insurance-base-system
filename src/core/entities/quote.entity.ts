import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('quote')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  quote_name: string;

  @Column({ type: 'date', nullable: true })
  effective_date: Date;

  @Column({ type: 'date', nullable: true })
  expiration_date: Date;

  @Column({ type: 'varchar', length: 225 })
  agency: string;

  @Column({ type: 'varchar', length: 225 })
  producer: string;

  @Column({ type: 'varchar', length: 225 })
  company: string;

  @Column({ type: 'varchar', length: 225 })
  risk_state: string;

  @Column({ type: 'boolean' })
  is_existing_policy: boolean;

  @Column({ type: 'varchar', length: 225 })
  applicant_details: string;
}
