import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Quote } from './quote.entity';
import { CoverableType } from './coverable-type.entity';
import { Account } from './account.entity';
import { Coverage } from './coverage.entity';

@Entity()
export class Coverable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quote_id', type: 'int', nullable: false })
  quoteId: number;

  @ManyToOne(() => Quote, (quote) => quote.coverables)
  @JoinColumn({ name: 'quote_id' })
  quote: Quote;

  @Column({ name: 'coverable_item_id', type: 'int', nullable: false })
  coverableItemId: number;

  @Column({ name: 'coverable_type_id', type: 'int', nullable: false })
  coverableTypeId: number;

  @ManyToOne(() => CoverableType)
  @JoinColumn({ name: 'coverable_type_id' })
  coverableType: CoverableType;

  @Column({ name: 'account_id', type: 'int', nullable: false })
  accountId: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

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

  @OneToMany(() => Coverage, (coverage) => coverage.coverable)
  coverages: Coverage[];
}
