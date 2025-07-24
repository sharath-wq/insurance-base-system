import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Coverable } from './coverable.entity';
import { CovTerm } from './cov-term.entity';

@Entity()
export class Coverage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string;

  @Column({ type: 'int', nullable: false })
  premium: number;

  @Column({ name: 'coverable_id', type: 'int', nullable: false })
  coverableId: number;

  @ManyToOne(() => Coverable, (coverable) => coverable.coverages)
  @JoinColumn({ name: 'coverable_id' })
  coverable: Coverable;

  @Column({ name: 'effective_date', type: 'date', nullable: false })
  effectiveDate: Date;

  @Column({ name: 'expiry_date', type: 'date', nullable: false })
  expiryDate: Date;

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

  @OneToMany(() => CovTerm, (covTerm) => covTerm.coverage)
  covTerms: CovTerm[];
}
