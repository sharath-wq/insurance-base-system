import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Locale } from './locale.entity';

@Entity('identity_type')
export class IdentityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  name: string;

  @ManyToOne(() => Locale)
  locale: Locale;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
