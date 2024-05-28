import { Entity, Column, OneToMany } from 'typeorm';
import { Application } from './application.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Candidate extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Application, (application) => application.candidate)
  applications: Application[];
}
