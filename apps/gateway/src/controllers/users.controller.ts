import { CreateUserDto } from '@app/contracts';
import { CreatePipelineDto } from '@app/contracts/pipelines/create-pipeline.dto';
import { IUser } from '@app/interfaces';
import { Body, Controller, Delete, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(@Inject('ACCOUNTS_SERVICE') private accountsProxy: ClientProxy) {}

  /** Создание нового пользователя */
  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this.accountsProxy.send('create-user', createUserDto);
  }
}
