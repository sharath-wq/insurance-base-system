import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('locale')
export class Locale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  en: string;

  @Column({ type: 'varchar', length: 225 })
  ar: string;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
