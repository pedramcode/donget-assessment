import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GroupService from './group.service';
import Group from './entities/group.entity';
import ExpencesService from '../expences/expences.service';

describe('GroupService', () => {
  let service: GroupService;
  let repo: Repository<Group>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let expencesService: ExpencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: getRepositoryToken(Group),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: ExpencesService,
          useValue: {
            getByGroupId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    repo = module.get<Repository<Group>>(getRepositoryToken(Group));
    expencesService = module.get<ExpencesService>(ExpencesService);
  });

  it('should create a group', async () => {
    (repo.save as jest.Mock).mockResolvedValue({ id: '1', name: 'test' });
    const result = await service.create({ name: 'test' });
    expect(result).toEqual({ id: '1', name: 'test' });
  });

  it('should throw on delete if not found', async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.delete('1')).rejects.toThrow('group not found');
  });
});
