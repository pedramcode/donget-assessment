import BaseModel from 'src/common/models/BaseModel';
import Group from 'src/group/entities/group.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export default class Expences extends BaseModel {
  @Column({
    type: 'varchar',
    length: 128,
  })
  desc: string;

  @Column({
    type: 'integer',
  })
  amount: number;

  @Column({
    type: 'varchar',
    length: 32,
  })
  paidBy: string;

  @ManyToOne(() => Group, (obj) => obj.expences)
  @JoinColumn()
  group: Group;
}
