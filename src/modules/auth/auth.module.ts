import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/secret';

import { authenticate } from 'passport';
// passport - strategy
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
// import { GoogleStrategy } from './passport/google-plus.strategy';
import { GoogleStrategy } from './passport/google-oauth.strategy';

import { authProviders } from './auth.provider';

@Module({
    imports: [
        UserModule, 
        PassportModule,
        ],
    providers: [
        ...authProviders,
        AuthService, 
        LocalStrategy , 
        JwtStrategy, 
        GoogleStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule {

}
