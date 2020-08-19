import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';

/*
    passport-local
    1. 사용자 검증
    2. passport logic 완료시 req.user 속성 획득
*/

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};

    // passport-local login
    @UseGuards(LocalAuthGuard) // nestjs/passport 의 AuthGuard 를 재정의 하여 사용하는 것이 명확
    @Post('local/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }


}