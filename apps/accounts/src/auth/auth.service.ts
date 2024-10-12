import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '@app/contracts';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto): Promise<UserEntity> {
    const user = await this.usersService.findOne(
      { email },
      { relations: { account: true } },
    );

    if (user && (await bcrypt.compare(password, user.password))) return user;
    return null;
  }

  async login(user: UserEntity) {
    const payload = { accountId: user.account.accountId, sub: user.userId };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
