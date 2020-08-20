import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
    // 현재 req.user 는 User 인터페이스 정의를 따름
    // 패스워드를 제외한 req.user 를 사용하도록 데코레이터 생성

    const req = ctx.switchToHttp().getRequest();
    const {password, ...user} = req.user;
    if(user){
        return user;
    }
    
    return null;
    },
);