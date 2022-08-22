import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { USER_REPOSITORY_PROVIDE } from './user.constant';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_PROVIDE)
    private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { name: username } });
  }

  async createOne(username: string, password: string): Promise<User> {
    return this.userRepository.save({ name: username, password });
  }
}
