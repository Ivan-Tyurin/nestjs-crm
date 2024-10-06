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
export class SourceEntity {
  @PrimaryGeneratedColumn()
  sourceId: number;

  @Column()
  accountId: number;

  @Column()
  name: string;

  @OneToMany(() => LeadEntity, (lead) => lead.source)
  leads: LeadEntity[];
}
