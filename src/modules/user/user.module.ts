import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Module({
  imports: [ TypeOrmModule.forFeature([UserRepository])], //forFeature 의 인자는 Entity List  혹은 Repository 이다.
  controllers: [UserController,],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule {}
