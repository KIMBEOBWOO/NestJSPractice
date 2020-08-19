import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // passport-local 은 옵션 추가가 없다.
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // UserService 의 현재 유저목록에 요청 유저가 존재 하는지 검사
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // user == undifined 일 경우 Exception Rising
      // 예외 계층 레이어에서 처리 유도
      throw new UnauthorizedException();
    }
    // user 존재 할 경우 user: User 리턴
    return user;
  }
}