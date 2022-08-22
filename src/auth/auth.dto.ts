import { IsString } from 'class-validator';
import { User } from '../user/user.entity';

export class SignInDTO {
  user: User;
}

export class SignUpDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
