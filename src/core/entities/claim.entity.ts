import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Policy } from './policy.entity';
import { Contact } from './contact.entity';
import { ListClaimStatus } from '../../common/enums';

@Entity('claim')
export class Claim {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'varchar', nullable: true })
  number: string;

  @Column({ type: 'date', nullable: true })
  raiseDt: Date;

  @Column({ type: 'date', nullable: true })
  incidentDt: Date;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  claimAmt: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  approvedAmt: number;

  @Column({ type: 'enum', enum: ListClaimStatus, nullable: true })
  status: ListClaimStatus;

  @ManyToOne(() => Policy, { nullable: true })
  @JoinColumn({ name: 'policyID' })
  policyID: Policy;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;
}
