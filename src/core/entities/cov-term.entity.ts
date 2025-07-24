import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Coverage } from './coverage.entity';

@Entity()
export class CovTerm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string;

  @Column({ type: 'int', nullable: false })
  limit: number;

  @Column({ type: 'int', nullable: false })
  deductible: number;

  @Column({ name: 'coverage_id', type: 'int', nullable: false })
  coverageId: number;

  @ManyToOne(() => Coverage, (coverage) => coverage.covTerms)
  @JoinColumn({ name: 'coverage_id' })
  coverage: Coverage;

  @Column({
    name: 'created_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate: Date;

  @Column({
    name: 'updated_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;
}
