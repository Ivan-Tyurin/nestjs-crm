import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from '../../accounts/entities/account.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  /** Роль/Должность пользователя */
  @Column()
  role: string;

  /** Имя пользователя */
  @Column()
  name: string;

  /** Почта пользователя */
  @Column()
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
