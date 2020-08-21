import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import request from 'request';

@Injectable()
export class TwitchOauthStrategy extends PassportStrategy(Strategy, 'twitch-oauth')
{
    constructor()
    {
        super({
            authorizationURL:'https://id.twitch.tv/oauth2/authorize',
            tokenURL: 'https://id.twitch.tv/oauth2/token',
            clientID: 'wosxuqcw5xu0nxfulk3772lazafi1z',
            clientSecret: 'a6edruoptxvbsl9uot1lrbd6hy37uz',
            callbackURL: `http://localhost:3000/auth/twitch/callback`,
            scope: 'user:read:email',
            passReqToCallback: true,
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        try
        {
            console.log(profile);
            console.log('accessToken of Twitch : ',accessToken);

            // 인증이 되었다면 토큰을 통한 프로파일 요청?



            const jwt: string = 'placeholderJWT'
            const user = 
            {
                jwt
            }

            done(null, user);
        }
        catch(err)
        {
            // console.log(err)
            done(err, false);
        }
    }

    userProfile(accessToken: string, done: (err?: Error | null, profile?: any) => void): void {
      const options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
          'Client-ID': 'wosxuqcw5xu0nxfulk3772lazafi1z',
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `Bearer ${accessToken}`
        }
      };
      console.log('user profile start');
      console.log(accessToken);
      console.log('---------------');
    //   request(options, (error, response, body) => {
    //     if (response && response.statusCode === 200) {
    //       done(null, JSON.parse(body).data[0]);
    //     } else {
    //       done(JSON.parse(body));
    //     }
    //   });
    }
}

// @Injectable()
// export class TwitchOauthStrategy {
//   constructor(
    
//   ) {
//     this.init();
//   }
  
//   private init(): void {
//     use('twitch-oauth', new Strategy({
//         authorizationURL:'https://id.twitch.tv/oauth2/authorize',
//         tokenURL: 'https://id.twitch.tv/oauth2/token',
//         clientID: 'wosxuqcw5xu0nxfulk3772lazafi1z',
//         clientSecret: 'a6edruoptxvbsl9uot1lrbd6hy37uz',
//         callbackURL: `http://localhost:3000/auth/twitch/callback`,
//         scope: 'user:read:email',
        
//     }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
//       try {
//         console.log(accessToken);
//         console.log('Profile : ',profile);
        
//         done(null,'ok');
//       } catch (error) {
//         done(error, false);
//       }
//     }));
//   }
// }