import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../config/secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청에서 JWT 토큰을 추출하는 방법 제공
      ignoreExpiration: false,                                  // 명시적으로 False, JWT 토큰의 기간 만료에 대해 대처하는
                                                                // 전략에 대한 명시 , 기간 만료를 무시 하지 않겟다는 의미
      secretOrKey: jwtConstants.secret,                         // 토큰 인증을 위한 대칭 비밀키 , 외부 공개시
                                                                // 타인이 요청 헤더 토큰의 해석이 가능함.
    });
  }

  // JWT Strategy 는 먼저 JWT Signiture 를 확인 한뒤 , JSON 디코딩을 수행한다.

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}