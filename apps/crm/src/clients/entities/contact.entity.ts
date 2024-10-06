import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity()
export class ContactEntity {
  @PrimaryGeneratedColumn()
  contactId: number;

  @Column()
  value: string;

  @Column()
  type: string;

  @ManyToOne(() => ClientEntity, (client) => client.contacts)
  client: ClientEntity;
}
