import { Controller, Post, UseGuards, Get ,Req, } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtGuard } from './guard/jwt-auth.guard';
import { AuthService } from './auth.service';
import { User } from './decorator/User.decorator';
import { Token } from './interface/token.interface';
import {  AuthGuard   } from '@nestjs/passport';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};

    // Local Login
    @UseGuards(LocalAuthGuard) // nestjs/passport 의 AuthGuard 를 재정의 하여 사용하는 것이 명확
    @Post('local/login')
    async login(@Req() req) {
        return await this.authService.createJwtToken(req.user);
    }

    // Google Login
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req){
        return 'ok';
    }

    // Twitch Login
    @Get('twitch')
    @UseGuards(AuthGuard('twitch-oauth'))
    async twitchAuth(@Req() req){
    }

    @Get('twitch/callback')
    @UseGuards(AuthGuard('twitch-oauth'))
    async twitchAuthCallback(@Req() req){
        return req.user.token;
    }

    // req.user Check - 토큰 유효 검사
    // 사용자 인증 필요 작업 -> 서버 요청 -> 토큰 유효검사 실행 -> 진위값 반환? or 아이디 값 반환
    @Get('profile')
    @UseGuards(JwtGuard)
    getProfile(@Req() req){ // @User - User 타입중 password 제외 리턴
        return req.user;
    }
}

