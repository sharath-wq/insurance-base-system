import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Coverable } from './coverable.entity';

@Entity()
export class CoverableType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225, nullable: false })
  type: string;

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

  @OneToMany(() => Coverable, (coverable) => coverable.coverableType)
  coverables: Coverable[];
}
