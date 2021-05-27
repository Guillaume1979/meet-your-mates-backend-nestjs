import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {
  canActivate(context: ExecutionContext) {
    let ctx = context.switchToHttp().getResponse();
    console.log('ctx : ', ctx.req['header']);
    // ctx.header({
    //   'Access-Control-Allow-Origin': 'http://localhost:4200',
    // });
    return super.canActivate(context) as boolean;
    // return true;
  }

  /* canActivate(context: ExecutionContext) {
    console.log('toto');
    console.log('super.canActivate(context) = ', super.canActivate(context));
    return super.canActivate(context);
    // const request = context.switchToHttp().getRequest();
    // return request;
    // Avant :
    // const activate = (await super.canActivate(context)) as boolean;
    // const request = context.switchToHttp().getRequest();
    // await super.logIn(request);
    // return activate;
  }*/
}
