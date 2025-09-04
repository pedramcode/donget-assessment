import BaseModel from '../../common/models/BaseModel';
import Expences from '../../expences/entities/expences.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export default class Group extends BaseModel {
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  desc: string | null;

  @OneToMany(() => Expences, (obj) => obj.group)
  expences: Expences[];
}
