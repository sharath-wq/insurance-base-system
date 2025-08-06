import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Yakeen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iqamaId: string;

  @Column('jsonb')
  data: any;
}
