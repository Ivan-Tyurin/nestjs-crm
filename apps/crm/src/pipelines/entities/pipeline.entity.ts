import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { LeadEntity } from '../../leads/entities/lead.entity';

@Entity()
@Unique(['accountId', 'name'])
export class PipelineEntity {
  @PrimaryGeneratedColumn()
  pipelineId: number;

  @Column()
  accountId: number;

  @Column()
  name: string;

  @OneToMany(() => LeadEntity, (lead) => lead.pipeline)
  leads: LeadEntity[];
}
