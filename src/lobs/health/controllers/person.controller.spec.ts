
import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from '../services/person.service';
import { CreatePersonDto } from '../dtos/create-person.dto';
import { BulkCreateDto } from '../dtos/bulk-create.dto';

describe('PersonController', () => {
  let controller: PersonController;
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findAllByQuoteId: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            bulkCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call the person service to create a person', async () => {
      const createPersonDto: CreatePersonDto = {} as any;
      await controller.create(createPersonDto);
      expect(service.create).toHaveBeenCalledWith(createPersonDto);
    });
  });

  describe('findAll', () => {
    it('should call the person service to find all persons', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getByQuoteId', () => {
    it('should call the person service to find all persons by quote id', async () => {
      const quoteId = '1';
      await controller.getByQuoteId(quoteId);
      expect(service.findAllByQuoteId).toHaveBeenCalledWith(quoteId);
    });
  });

  describe('findOne', () => {
    it('should call the person service to find one person', async () => {
      const id = 1;
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call the person service to update a person', async () => {
      const id = 1;
      const updatePersonDto: CreatePersonDto = {} as any;
      await controller.update(id, updatePersonDto);
      expect(service.update).toHaveBeenCalledWith(id, updatePersonDto);
    });
  });

  describe('remove', () => {
    it('should call the person service to remove a person', async () => {
      const id = 1;
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('bulkCreate', () => {
    it('should call the person service to bulk create persons', async () => {
      const file = { buffer: Buffer.from('test') } as any;
      const body: BulkCreateDto = { quote_id: '1' };
      await controller.bulkCreate(file, body);
      expect(service.bulkCreate).toHaveBeenCalledWith(file.buffer, body.quote_id);
    });
  });
});
