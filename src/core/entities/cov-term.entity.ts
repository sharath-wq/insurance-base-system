import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Coverage } from './coverage.entity';
import { Contact } from './contact.entity';

@Entity('cov_term')
export class CovTerm {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  stringVal: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  limitVal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deductibleVal: number;

  @ManyToOne(() => Coverage, { nullable: true })
  covID: Coverage;

  @ManyToOne(() => Contact, { nullable: true })
  updateUser: Contact;

  @ManyToOne(() => CovTerm, { nullable: true })
  basedOnID: CovTerm;
}
