import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';


import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule,TypeOrmModule.forRoot(),UserModule],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
