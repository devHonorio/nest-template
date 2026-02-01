import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import { AuthService } from 'src/domain/auth/auth.service';
import { User } from 'src/domain/users/entities/User';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async createUser(@Body() { phone, name }: SignupDto) {
    const user = new User({ phone, name, id: '', verified: false });

    return await this.authService.signup(user);
  }
}
