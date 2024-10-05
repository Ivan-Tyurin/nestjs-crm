import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  accountId: number;

  /** Название аккаунта */
  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.account)
  users: UserEntity[];
}
