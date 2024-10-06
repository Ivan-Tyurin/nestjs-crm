import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PipelineEntity } from '../../pipelines/entities/pipeline.entity';
import { StatusEntity } from '../../statuses/entities/status.entity';
import { SourceEntity } from '../../sources/entities/source.entity';
import { ClientEntity } from '../../clients/entities/client.entity';

@Entity()
export class LeadEntity {
  @PrimaryGeneratedColumn()
  leadId: number;

  @Column()
  name: string;

  @Column()
  accountId: number;

  @Column()
  responsibleUserId: number;

  @ManyToOne(() => PipelineEntity, (pipeline) => pipeline.leads, {
    nullable: true,
  })
  pipeline: PipelineEntity;

  @ManyToOne(() => StatusEntity, (status) => status.leads, {
    nullable: true,
  })
  status: StatusEntity;

  @ManyToOne(() => StatusEntity, (source) => source.leads, {
    nullable: true,
  })
  source: SourceEntity;

  @ManyToOne(() => ClientEntity, (client) => client.leads, {
    nullable: true,
  })
  client: ClientEntity;

  // @ManyToMany()
}
