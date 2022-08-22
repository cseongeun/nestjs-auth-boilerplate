import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ROUTE } from './auth.constant';
import { LocalAuthGuard } from './guard/local.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { SignInDTO, SignUpDTO } from './auth.dto';

@Controller(ROUTE.ROOT)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(ROUTE.SIGN_IN)
  async signin(@Request() req: SignInDTO) {
    const { user } = req;
    return this.authService.signin(user);
  }

  @Post(ROUTE.SIGN_UP)
  async signup(@Body() body: SignUpDTO) {
    const { username, password } = body;
    return this.authService.signup(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
