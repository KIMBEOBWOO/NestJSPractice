import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './interface/user.interface';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: string): Promise<any | undefined> {
    const user = await this.userRepository.findOne(id);
    console.log('[findOne Result ] : ',user);
    return user;
  }

  async addOne(user: User){
    const addUser = await this.userRepository.create();
    addUser.id = user.id;
    addUser.pw = user.pw;
    addUser.roles = user.roles;

    const result = await this.userRepository.save(addUser);
    console.log('[addOne Result ] : ',result);
    return result;
  }

  async findAll(){
    const result: User[] = await this.userRepository.find();
    return result;
  }

  async deleteOneById(id: string){
    const result = await this.userRepository.delete(id);
    return result;
  }
}