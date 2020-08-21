// import OAuth2Strategy from 'passport-oauth2';
// import request from 'request';
// import { Injectable } from '@nestjs/common';
// import { use } from 'passport';
// import express from 'express';
// @Injectable()
// export class TwitchStrategy extends OAuth2Strategy {
//     // constructor(
//     //   options: OAuth2Strategy.StrategyOptionsWithRequest,
//     //   verify: OAuth2Strategy.VerifyFunctionWithRequest
//     // ) {
//     //   super(options, verify);
  
//     //   this.name = 'twitch';
  
//     //   this._oauth2.setAuthMethod('Bearer');
//     //   this._oauth2.useAuthorizationHeaderforGET(true);
//     //   this.init();
//     // }

//     // private init():void{
//     //     use('twitch-oauth', new TwitchStrategy({
//     //         authorizationURL:'https://id.twitch.tv/oauth2/authorize',
//     //         tokenURL: 'https://id.twitch.tv/oauth2/token',
//     //         clientID: 'wosxuqcw5xu0nxfulk3772lazafi1z',
//     //         clientSecret: 'a6edruoptxvbsl9uot1lrbd6hy37uz',
//     //         callbackURL: `http://localhost:3000/auth/twitch/callback`,
//     //         scope: 'user:read:email',
//     //         passReqToCallback: true,
            
//     //     }, async (req: express.Request, accessToken: string,
//     //         refreshToken: string, profile: any,
//     //         done: OAuth2Strategy.VerifyCallback) => {
//     //       try {
//     //         console.log(accessToken);
//     //         console.log('Profile : ',profile);
            
//     //         done(null,{user:'ok'});
//     //       } catch (error) {
//     //         console.log(error);
//     //       }
//     //     }));
//     // }
//     /**
//      * Retrieve user profile from Twitch.
//      *
//      * This function constructs a normalized profile, with the following properties:
//      *   - `provider`         always set to `twitch`
//      *   - `id`
//      *   - `username`
//      *   - `displayName`
//      * @param {String} accessToken
//      * @param {Function} done
//      * @api protected
//      */
// //     userProfile(accessToken: string, done: (err?: Error | null, profile?: any) => void): void {
// //       const options = {
// //         url: 'https://api.twitch.tv/helix/users',
// //         method: 'GET',
// //         headers: {
// //           'Client-ID': 'wosxuqcw5xu0nxfulk3772lazafi1z',
// //           Accept: 'application/vnd.twitchtv.v5+json',
// //           Authorization: `Bearer ${accessToken}`
// //         }
// //       };
  
// //       request(options, (error, response, body) => {
// //         if (response && response.statusCode === 200) {
// //           done(null, JSON.parse(body).data[0]);
// //         } else {
// //           done(JSON.parse(body));
// //         }
// //       });
// //     }
  
// //     authorizationParams(options: any): any {
// //       const params: {[key: string]: any} = {};
// //       if (options.forceVerify) {
// //         params.force_verify = !!options.forceVerify;
// //       }
// //       return params;
// //     }
// //   }
  














// // import { PassportStrategy } from '@nestjs/passport';
// // import { Strategy  } from 'passport-twitch';
// // // import { Strategy  } from 'passport-oauth2';

// // import { Injectable } from '@nestjs/common';

// // import { twitchConfig } from '../config/twitch-config';
// // import { AuthService } from '../auth.service';
// // import { Token } from '../interface/token.interface';
      
// // @Injectable()
// // export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch'){
// //     constructor(private readonly authService: AuthService){
// //         super({
// //             clientID: twitchConfig.clientID,
// //             clientSecret: twitchConfig.clientSecret,
// //             callbackURL: twitchConfig.callbackURL,
// //             passReqToCallback: true,
// //             scope: twitchConfig.scope,
// //         })
// //     }

// //     async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function){
// //         try{
// //             console.log('Twitch Validate Start');
// //             // const jwt: Token = await this.authService.createJWT(profile.id);
// //             // console.log('[In Twitch Validate]', jwt);
            
// //             /*
// //                 1. 회원이 아닌경우  ->  회원가입 수행 , 토큰 발행 , done()
// //                 2. 회원인 경우      ->  토큰 발행 , done()
                    
// //                 3. accessToken 을 통한 추가 API 가 필요한 경우  -> accessToken / refreshToken 저장 및 재요청
// //             */
            
// //             // done(null, jwt);
// //         }catch(err){
// //             console.log('Twitch Validate Error',err);
// //             done(err,false);
// //         }
// //     }
// // }
      