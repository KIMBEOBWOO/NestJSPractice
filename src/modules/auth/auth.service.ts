import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService) { } // UserService 클래스 생성자 통한 주입 
  
    
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

    async login(user: any){
        const payload = { username: user.username , sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}