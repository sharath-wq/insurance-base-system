// dto/bulk-create.dto.ts
import { IsString } from 'class-validator';

export class BulkCreateDto {
  @IsString()
  quote_id: string;
}
