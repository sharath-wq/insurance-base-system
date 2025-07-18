import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('relation')
export class Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  code: string;

  @Column({ type: 'varchar', length: 225 })
  name_en: string;

  @Column({ type: 'varchar', length: 225 })
  name_ar: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
