import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import { CreateAuth, createAuthSchema } from './dto/create-auth.input';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(createAuthSchema))
  async register(@Body() body: CreateAuth) {
    return await this.authService.registerOne(body);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(createAuthSchema))
  async login(@Body() body: CreateAuth) {
    return await this.authService.authenticateOne(body);
  }
}
