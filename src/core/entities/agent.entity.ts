import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IdentityType } from './identity-type.entity';
import { Agency } from './agency.entity';

@Entity('agent')
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 225 })
  name: string;

  @Column({ type: 'integer' })
  agent_id: number;

  @ManyToOne(() => IdentityType)
  identity_type: IdentityType;

  @Column({ type: 'varchar', length: 225 })
  email: string;

  @Column({ type: 'numeric', precision: 10, scale: 0 })
  mobile: number;

  @Column({ type: 'integer' })
  agent_code: number;

  @Column({ type: 'varchar', length: 225 })
  user_name: string;

  @Column({ type: 'varchar', length: 225 })
  status: string;

  @Column({ type: 'varchar', length: 225 })
  agent_type: string;

  @Column({ type: 'boolean' })
  is_admin: boolean;

  @Column({ type: 'boolean' })
  is_tenant: boolean;

  @Column({ type: 'boolean' })
  is_user: boolean;

  @Column({ type: 'varchar', length: 225 })
  access_type: string;

  @ManyToOne(() => Agency)
  agency: Agency;

  @Column({ type: 'timestamp', nullable: true })
  created_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_date: Date;
}
