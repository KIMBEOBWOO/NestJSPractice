import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-oauth2";
import { AuthService } from "../auth.service";
import { Token } from '../interface/token.interface';
// const axios = require('axios');
import axios from 'axios';

@Injectable()
export class TwitchOauthStrategy extends PassportStrategy(Strategy, 'twitch-oauth')
{
    constructor(private readonly authService : AuthService)
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
    
    userProfile(accessToken: string, done: (err?: Error | null, profile?: any) => void): void {
      const options = {
        // url: 'https://api.twitch.tv/helix/users',
        // method: 'GET',
        headers: {
          'Client-ID': 'wosxuqcw5xu0nxfulk3772lazafi1z',
          Accept: 'application/vnd.twitchtv.v5+json',
          Authorization: `Bearer ${accessToken}`
        }
      };

      console.log('[user profile start...]');
      console.log('accessToken in profile : ',accessToken);
      axios.get('https://api.twitch.tv/helix/users',options)
        .then((result) => {
            /*
                id , login , display_name , type , broadcaster_type,
                profile_image_url , email , view_count
            */

            //console.log(result.data.data[0]);
            done(null, result.data.data[0].login);
        })
        .catch((err) => {
            console.log(err);
            done(new UnauthorizedException());
        })
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function){
        try{
            console.log(profile);
            console.log('accessToken in validate : ',accessToken);
            console.log('refreshToken in validate : ',refreshToken);
            const jwt: Token = await this.authService.createJWT(profile);
            // 트위치 엑세스 토큰은 DB 저장하고
            // 로그인 인증용 JWT 토큰은 done 리턴 하는 방식 

            done(null,jwt);

        }catch(err){
            done(new UnauthorizedException());
        }
    }
}
