import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Policy } from './policy.entity';
import { Contact } from './contact.entity';
import { Coverable } from './coverable.entity';

@Entity('quote')
export class Quote {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'boolean', nullable: true })
  isSelected: boolean;

  @Column({ type: 'date', nullable: true })
  quoteDt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  premiumAmt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  taxAmt: number;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  surchargeAmt: number;

  @ManyToOne(() => Policy, { nullable: true })
  @JoinColumn({ name: 'policyID' })
  policyID: Policy;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;

  @OneToMany(() => Coverable, (coverable) => coverable.quoteID)
  coverables: Coverable[];
}
