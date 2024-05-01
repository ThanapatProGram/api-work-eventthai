import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'; 
import { User } from './user.model'; 
import { JwtAuthGuard } from './jwt-auth.guard'; 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User): Promise<string> {
    const result = await this.authService.register(user);
    return result;
  }

  @Post('login')
  async login(@Body() { email, password }): Promise<{ access_token: string, message: string } | string> {
    const result = await this.authService.login(email, password);
    return result;
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  async getUsers(@Request() req): Promise<User[]> {
    return this.authService.getUsers();
  }
}

