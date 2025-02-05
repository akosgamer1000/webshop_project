import { Body, Controller, Param, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { ApiParam } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login with email and password
   * 
   * @param loginDto The data to login with
   * @returns JSON response
   */

  @Post('login')
  @ApiParam({name: 'loginDto', type: LoginDto})

  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
