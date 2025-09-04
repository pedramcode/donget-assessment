import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Group from './entities/group.entity';
import GroupCreateDto from './dto/group.create.dto';
import GroupUpdateDto from './dto/group.update.dto';
import ExpencesService from 'src/expences/expences.service';
import SettlementResponseDto from './dto/settlement.response.dto';

@Injectable()
export default class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
    private readonly expenceService: ExpencesService,
  ) {}

  async create(data: GroupCreateDto) {
    return this.groupRepo.save({
      ...data,
    });
  }

  async delete(id: string) {
    const group = await this.groupRepo.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    return this.groupRepo.remove(group);
  }

  async settlement(groupId: string) {
    const group = await this.get(groupId);
    const expences = await this.expenceService.getByGroupId(group.id);
    const sum = expences.reduce((s, c) => s + c.amount, 0);

    const userPaid: Record<string, number> = {};
    for (const expence of expences) {
      userPaid[expence.paidBy] =
        (userPaid[expence.paidBy] || 0) + expence.amount;
    }

    const users = Object.keys(userPaid);
    const avg = users.length > 0 ? sum / users.length : 0;

    const items = users.map((user) => ({
      user,
      amount: avg - userPaid[user],
    }));

    const response: SettlementResponseDto = new SettlementResponseDto();
    response.groupId = group.id;
    response.sum = sum;
    response.items = items;

    return response;
  }

  async get(id: string) {
    const group = await this.groupRepo.findOne({
      where: { id },
    });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    return group;
  }

  async getAll(page: number, limit: number) {
    const group = await this.groupRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return group;
  }

  async getAllUnsafe() {
    const group = await this.groupRepo.find();
    return group;
  }

  async update(id: string, data: GroupUpdateDto) {
    const group = await this.groupRepo.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('group not found');
    }
    return this.groupRepo.save({
      ...group,
      ...data,
    });
  }
}
