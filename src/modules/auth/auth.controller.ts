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

    
    // req.user Check - 토큰 유효 검사
    // 사용자 인증 필요 작업 -> 서버 요청 -> 토큰 유효검사 실행 -> 진위값 반환? or 아이디 값 반환
    @Get('profile')
    @UseGuards(JwtGuard)
    getProfile(@Req() req: Request){ // @User - User 타입중 password 제외 리턴
        return req.user;
    }
}



// // google login
// @Get('google/uri')
// async requestGoogleRedirectUri(): Promise<any> {
//     return await this.authService.requestGoogleRedirectUri();
// }

// @Get('google/signin')
// async googleSignIn(@Req() req: Request): Promise<any> {
//     return await this.authService.googleSignIn(req.query.code as string);
// }

// @Post('google/token')
// async requestJsonWebTokenAfterGoogleSignIn(@Req() req:Request): Promise<Token> {
//     return await this.authService.login(req.body);
// }
