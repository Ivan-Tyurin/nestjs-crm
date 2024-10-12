import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { LeadEntity } from '../../leads/entities/lead.entity';
import { IPipeline } from '@app/interfaces';

@Entity()
@Unique(['accountId', 'name'])
export class PipelineEntity implements IPipeline {
  /** ID воронки */
  @PrimaryGeneratedColumn()
  pipelineId: number;

  /** ID аккаунта */
  @Column()
  accountId: number;

  /** Название воронки */
  @Column()
  name: string;

  @OneToMany(() => LeadEntity, (lead) => lead.pipeline, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  leads: LeadEntity[];
}
