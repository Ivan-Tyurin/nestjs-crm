import { IUser } from '@app/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): IUser => {
    const request = ctx.switchToHttp().getRequest();
    const user: IUser = request.user;

    return data ? user?.[data] : user;
  },
);
