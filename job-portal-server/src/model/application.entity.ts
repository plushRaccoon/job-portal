import { Entity, Column, ManyToOne } from 'typeorm';
import { Candidate } from './candidate.entity';
import { Position } from './position.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Application extends BaseEntity {
  @ManyToOne(() => Candidate, (candidate) => candidate.applications)
  candidate: Candidate;

  @ManyToOne(() => Position, (position) => position.applications)
  position: Position;

  @Column('text')
  cv: string;
}
