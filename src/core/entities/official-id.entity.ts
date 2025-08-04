import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contact } from './contact.entity';
import { ListOfficialIDType } from '../../common/enums';

@Entity('official_id')
export class OfficialID {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'date', nullable: true })
  createDt: Date;

  @Column({ type: 'date', nullable: true })
  updateDt: Date;

  @ManyToOne(() => Contact, { nullable: true })
  contactID: Contact;

  @Column({ type: 'enum', enum: ListOfficialIDType, nullable: true })
  type: ListOfficialIDType;

  @Column({ type: 'varchar', nullable: true })
  number: string;

  @Column({ type: 'date', nullable: true })
  effectiveDt: Date;

  @Column({ type: 'date', nullable: true })
  expirationDt: Date;
}
