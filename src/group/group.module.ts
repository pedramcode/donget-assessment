import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Group from './entities/group.entity';
import GroupService from './group.service';
import GroupController from './group.controller';
import { ExpencesModule } from 'src/expences/expences.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), Group, ExpencesModule],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}
