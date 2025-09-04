import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ExpencesService from './expences.service';
import Expences from './entities/expences.entity';
import GroupService from '../group/group.service';

describe('ExpencesService', () => {
  let service: ExpencesService;
  let repo: Repository<Expences>;
  let groupService: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpencesService,
        {
          provide: getRepositoryToken(Expences),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: GroupService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExpencesService>(ExpencesService);
    repo = module.get<Repository<Expences>>(getRepositoryToken(Expences));
    groupService = module.get<GroupService>(GroupService);
  });

  it('should create an expence', async () => {
    (groupService.get as jest.Mock).mockResolvedValue({ id: 'g1' });
    (repo.save as jest.Mock).mockResolvedValue({ id: 'e1', amount: 10 });
    const result = await service.create({
      groupId: 'g1',
      paidBy: 'user',
      amount: 10,
      desc: 'test',
    });
    expect(result).toEqual({ id: 'e1', amount: 10 });
  });

  it('should throw on delete if not found', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.delete('1')).rejects.toThrow('expence not found');
  });
});
