import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Quote } from './quote.entity';
import { Vehicle } from '../../lobs/auto/entites/vehicle.entity';
import { PolicyContactRole } from './policy-contact-role.entity';
import { Contact } from './contact.entity';
import { Coverage } from './coverage.entity';
import { ListCoverable } from '../../common/enums';

@Entity('coverable')
export class Coverable {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @Column({ type: 'enum', enum: ListCoverable, nullable: true })
  type: ListCoverable;

  @ManyToOne(() => Quote, { nullable: true })
  @JoinColumn({ name: 'quoteID' })
  quoteID: Quote;

  @ManyToOne(() => Vehicle, { nullable: true })
  @JoinColumn({ name: 'caVehicleID' })
  caVehicleID: Vehicle;

  @ManyToOne(() => Vehicle, { nullable: true })
  @JoinColumn({ name: 'paVehicleID' })
  paVehicleID: Vehicle;

  @ManyToOne(() => PolicyContactRole, { nullable: true })
  @JoinColumn({ name: 'contactID' })
  contactID: PolicyContactRole;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  @JoinColumn({ name: 'updateUser' })
  updateUser: Contact;

  @ManyToOne(() => Coverable, { nullable: true })
  @JoinColumn({ name: 'basedOnID' })
  basedOnID: Coverable;

  @OneToMany(() => Coverage, (coverage) => coverage.coverableID)
  coverages: Coverage[];
}
