import { Person } from 'src/lobs/health/entities/person.entity';

export interface BulkCreateResponse {
  members: Person[];
  memberCount: number;
}
