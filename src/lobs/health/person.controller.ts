import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { CreatePersonDto } from './dtos/create-person.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BulkCreateResponse } from 'src/types/bulk-create-response.interface';
import { diskStorage } from 'multer';

@Controller('health/persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<Person> {
    return this.personService.create(createPersonDto);
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Person> {
    return this.personService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonDto: CreatePersonDto,
  ): Promise<Person> {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.personService.remove(id);
  }

  @Post('bulk-create')
  @UseInterceptors(FileInterceptor('file'))
  async bulkCreate(
    @UploadedFile() file: Express.Multer.File,
    @Query('quote_id') quote_id: string,
  ): Promise<BulkCreateResponse> {
    return this.personService.bulkCreate(file.buffer, quote_id);
  }
}
