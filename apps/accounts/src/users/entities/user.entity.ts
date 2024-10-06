import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from '../../accounts/entities/account.entity';
import { IUser } from '@app/interfaces';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  userId: number;

  /** Роль/Должность пользователя */
  @Column()
  role: string;

  /** Имя пользователя */
  @Column()
  name: string;

  /** Почта пользователя */
  @Column({ unique: true })
  email: string;

  /** Пароль пользователя */
  @Column()
  password: string;

  @ManyToOne(() => AccountEntity, (account) => account.users, {
    nullable: false,
  })
  account: AccountEntity;
}
