import { Injectable, Inject, Provider } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';
import { User } from '../user/interface/user.interface';
import { Token } from './interface/token.interface';
import { jwtConstants } from './config/secret';

import { get, post, Response } from 'request';

// social authentication config provider
import { GoogleConfig } from './interface/google-config.interface';
import { GOOGLE_CONFIG_TOKEN } from '../../server.config';

@Injectable()
export class AuthService {
    private url: string;

    constructor(
        @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: GoogleConfig,
        private usersService: UserService,
    ) {
        this.url = 'http://localhost:3000';
     } // UserService 클래스 생성자 통한 주입 
     
    
    async validateUser(username: string, pass: string): Promise<any> {
        // user 이름을 통해 user 목록 검색 결과를 user 에 저장
        const user = await this.usersService.findOne(username); // type of user = User | undefined
        // user 가 존재 하고 pw 가 일치하면 password 제외 해당 유저 정보를 리턴
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async createJwtToken(user: User): Promise<Token>{
        // Case 1 : pakage 'jsonwebtoken'
        const expiresIn: string = '48h';
        const token: string = sign({
            sub: user.username
        }, jwtConstants.secret, { expiresIn });

        return {
            token
        };

        // Case 2 : pakage '@nest/jwt'
        // const payload = { username: user.username , sub: user.userId };
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };
    }

    async createJWT(thirdPartyId: string): Promise<Token>{
        const payload = {
            thirdPartyId
        };

        const token: string = sign(payload,jwtConstants.secret,{ expiresIn : '60s'});
        return { token };    
    }

    async findUserById(username: string): Promise<User>{
        const user = await this.usersService.findOne(username);
        if(user){
            return user;
        }
        return null;
    }

}

// async googleLogin(req) {
//     if (!req.user) {
//       return 'No user from google'
//     }

//     return {
//       message: 'User information from google',
//       user: req.user
//     }
//   }

// async requestGoogleRedirectUri(): Promise<{ redirect_uri: string } | any> {
//     const queryParams: string[] = [
//       `client_id=${this.googleConfig.client_id}`,
//       `redirect_uri=${this.googleConfig.oauth_redirect_uri}`,
//       `response_type=${this.googleConfig.response_type}`,
//       `scope=${this.googleConfig.scopes.join(' ')}`
//     ];
//     const redirect_uri: string = `${this.googleConfig.login_dialog_uri}?${queryParams.join('&')}`;

//     return {
//       redirect_uri
//     };
// }

// async googleSignIn(code: string): Promise<any> {
//     return new Promise((resolve: Function, reject: Function) => {
//         //console.log('[Google Auth Code]',code);
        
//         post({
//             url: this.googleConfig.access_token_uri,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             form: {
//                 code,
//                 client_id: this.googleConfig.client_id,
//                 client_secret: this.googleConfig.client_secret,
//                 redirect_uri: this.googleConfig.oauth_redirect_uri,
//                 grant_type: this.googleConfig.grant_type
//             }
//         }, async (err: Error, res: Response, body: any) => {
//             if (err) {
//                 return reject(err);
//             }
    
//             if (body.error) {
//                 return reject(body.error);
//             }
            
//             const { access_token } = JSON.parse(body);
//             //console.log('[Google Access Token : ]',access_token);

//             post({
//             url: `${this.url}/auth/google/token`,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             form: {
//                 access_token
//             }
//             }, async (err: Error, res: Response, body: any) => {
//             if (err) {
//                 return reject(err);
//             }
//             if (body.error) {
//                 return reject(body.error);
//             }
//                 resolve(body);
//             });
//         });
//     });
//   }