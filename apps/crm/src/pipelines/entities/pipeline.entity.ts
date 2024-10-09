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
  /** ID воронки */
  @PrimaryGeneratedColumn()
  pipelineId: number;

  /** ID аккаунта */
  @Column()
  accountId: number;

  /** Название воронки */
  @Column()
  name: string;

  @OneToMany(() => LeadEntity, (lead) => lead.pipeline)
  leads: LeadEntity[];
}
