import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Application } from './application.entity';
import { PositionStatusEnum } from '../constants/enums';

@Entity()
export class Position extends BaseEntity {
  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: PositionStatusEnum,
  })
  status: string;

  @OneToMany(() => Application, (application) => application.position)
  applications: Application[];
}
