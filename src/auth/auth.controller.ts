import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/authDto';

@Controller('auth')
export class AuthController {
  @Post('otp')
  requestOtp(@Body() { phone }: AuthDto) {
    return phone;
  }
}
