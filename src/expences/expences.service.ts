import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Expences from './entities/expences.entity';
import ExpencesCreateDto from './dto/expences.create.dto';
import GroupService from '../group/group.service';
import ExpencesUpdateDto from './dto/expences.update.dto';

@Injectable()
export default class ExpencesService {
  constructor(
    @InjectRepository(Expences)
    private readonly expencesRepo: Repository<Expences>,
    @Inject(forwardRef(() => GroupService))
    private readonly goupService: GroupService,
  ) {}

  async getByGroupId(groupId: string) {
    return await this.expencesRepo.find({ where: { group: { id: groupId } } });
  }

  async create(data: ExpencesCreateDto) {
    const group = await this.goupService.get(data.groupId);
    return this.expencesRepo.save({
      ...data,
      group,
    });
  }

  async delete(id: string) {
    const expence = await this.expencesRepo.findOne({ where: { id } });
    if (!expence) {
      throw new NotFoundException('expence not found');
    }
    return this.expencesRepo.remove(expence);
  }

  async get(id: string) {
    const expence = await this.expencesRepo.findOne({
      where: { id },
    });
    if (!expence) {
      throw new NotFoundException('expence not found');
    }
    return expence;
  }

  async getAll(page: number, limit: number) {
    const expence = await this.expencesRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return expence;
  }

  async getAllUnsafe() {
    const expences = await this.expencesRepo.find();
    return expences;
  }

  async update(id: string, data: ExpencesUpdateDto) {
    const expence = await this.expencesRepo.findOne({ where: { id } });
    if (!expence) {
      throw new NotFoundException('expence not found');
    }
    const group = await this.goupService.get(data.groupId);
    return this.expencesRepo.save({
      ...expence,
      ...data,
      group,
    });
  }
}
