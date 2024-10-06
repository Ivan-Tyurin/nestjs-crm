import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeadEntity } from '../../leads/entities/lead.entity';
import { ContactEntity } from './contact.entity';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  clientId: number;

  @Column()
  accountId: number;

  @Column()
  name: string;

  @OneToMany(() => LeadEntity, (lead) => lead.pipeline)
  leads: LeadEntity[];

  @ManyToOne(() => ContactEntity, (contact) => contact.client)
  contacts: ContactEntity[];
}
