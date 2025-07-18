import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Locale } from './locale.entity';

@Entity('policy_status')
export class PolicyStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  status_code: string;

  @ManyToOne(() => Locale)
  locale: Locale;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
