import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../config/secret';
import { User } from '../../user/interface/user.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청에서 JWT 토큰을 추출하는 방법 제공
      ignoreExpiration: false,                                  // 명시적으로 False, JWT 토큰의 기간 만료에 대해 대처하는
                                                                // 전략에 대한 명시 , 기간 만료를 무시 하지 않겟다는 의미
      secretOrKey: jwtConstants.secret,                         // 토큰 인증을 위한 대칭 비밀키 , 외부 공개시
                                                                // 타인이 요청 헤더 토큰의 해석이 가능함.
    });
  }

  /*
      payload : {
        thirdPartyId : user Id
        iat : 백엔드가 토큰을 발급한 epoch 시간
        exp : 토큰 만료 epoch 시간
      }
    */


  // JWT Strategy 는 먼저 JWT Signiture 를 확인 한뒤 , JSON 디코딩을 수행한다.
  async validate(payload: any, done: Function , roles: string) {
    const userRole = payload.roles;

    if(userRole === 'Admin'){
      console.log('[Admin Login]');
      return done(null,'admin');
    }
    else{
      if(!payload.sub){
        console.log('[JWT PROFILE : Error UnauthorizedException]');
        return done(new UnauthorizedException('invalid token claims'), false);
      }
      else{
        return done(null,payload);
      }
    } 
  }
}