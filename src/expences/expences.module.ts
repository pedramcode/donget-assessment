import { forwardRef, Module } from '@nestjs/common';
import { GroupModule } from 'src/group/group.module';
import ExpencesService from './expences.service';
import ExpencesController from './expences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Expences from './entities/expences.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expences]),
    forwardRef(() => GroupModule),
  ],
  providers: [ExpencesService],
  controllers: [ExpencesController],
  exports: [ExpencesService],
})
export class ExpencesModule {}
