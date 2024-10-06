import { IAccount } from '../accounts/account.interface';

export interface IUser {
  userId: number;
  role: string;
  name: string;
  email: string;
  password: string;
  account: IAccount;
}
