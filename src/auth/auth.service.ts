import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { isValidPassword, transformPassword } from '../app/util/crypto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(username);

    if (user) {
      const validatePassword = await isValidPassword(password, user.password);
      if (validatePassword) {
        return user;
      } else {
        // password error
        return null;
      }
    }
    // not found user
    return null;
  }

  async signin(user: User) {
    const payload = { username: user.name, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(username: string, password: string): Promise<boolean> {
    const existtUser = await this.userService.findOne(username);

    if (existtUser) {
      // Error: Already exist name

      throw new Error('');
    }

    // 비밀번호 조건 확인

    const encryptPassword = await transformPassword(password);

    const user = await this.userService.createOne(username, encryptPassword);

    if (user) {
      return true;
    }

    return false;
  }
}
