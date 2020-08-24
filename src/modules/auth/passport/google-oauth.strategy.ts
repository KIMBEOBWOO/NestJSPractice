import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

import { googleConfig } from '../config/google-config';
import { AuthService } from '../auth.service';
import { Token } from '../interface/token.interface';

import Google from 'passport-google-oauth20';

import express from 'express';

// function verify(
//     req: express.Request,
//     accessToken: string,
//     refreshToken: string,
//     profile: Google.Profile,
//     done: Google.VerifyCallback){
    
//     console.log('accessToken in Google validate : ',accessToken);
//     console.log('refreshToken in Google validate : ',refreshToken);
//     console.log(profile);
//     done(null,profile.id);
// }
      
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private readonly authService: AuthService){
        super({
            clientID: googleConfig.client_id,
            clientSecret: googleConfig.client_secret,
            callbackURL: googleConfig.oauth_redirect_uri,
            passReqToCallback: true,
            scope: ['email', 'profile'],
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function){
        try{
            const jwt: Token = await this.authService.createJWT(profile.id);
            console.log('[In Google Validate]', jwt);
            
            // console.log('accessToken in Google validate : ',accessToken);
            // console.log('refreshToken in Google validate : ',refreshToken);
            
            /*
                1. 회원이 아닌경우  ->  회원가입 수행 , 토큰 발행 , done()
                2. 회원인 경우      ->  토큰 발행 , done()
                    
                3. accessToken 을 통한 추가 API 가 필요한 경우  -> accessToken / refreshToken 저장 및 재요청
            */
            
            done(null, jwt);
        }catch(err){
            done(err,false);
        }
    }
}
      