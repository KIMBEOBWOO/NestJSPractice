import { Injectable, Inject, Provider } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sign } from 'jsonwebtoken';
import { User } from '../user/interface/user.interface';
import { Token } from './interface/token.interface';
import { jwtConstants } from './config/secret';

import { get, post, Response } from 'request';

// social authentication config provider
import { GoogleConfig } from './interface/google-config.interface';
import { GOOGLE_CONFIG_TOKEN , TWITCH_CONFIG_TOKEN } from '../../server.config';

@Injectable()
export class AuthService {
    private url: string;

    constructor(
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