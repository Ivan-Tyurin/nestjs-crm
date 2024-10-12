import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { IAccount } from '@app/interfaces';

@Entity()
export class AccountEntity implements IAccount {
  @PrimaryGeneratedColumn()
  accountId: number;

  /** Название аккаунта */
  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.account, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  users: UserEntity[];
}
