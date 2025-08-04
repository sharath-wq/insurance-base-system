import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Coverable } from './coverable.entity';
import { Contact } from './contact.entity';
import { CovTerm } from './cov-term.entity';

@Entity('coverage')
export class Coverage {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  premiumAmt: number;

  @ManyToOne(() => Coverable, { nullable: true })
  @JoinColumn({ name: 'coverableID' })
  coverableID: Coverable;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;

  @ManyToOne(() => Coverage, { nullable: true })
  @JoinColumn({ name: 'basedOnID' })
  basedOnID: Coverage;

  @OneToMany(() => CovTerm, (covTerm) => covTerm.covID)
  covTerms: CovTerm[];
}
