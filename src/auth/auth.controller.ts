import { Body, Controller, Get, Param, Post, UnauthorizedException, UseGuards,Request, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { UserService } from 'src/user/user.service';


@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService : UserService) {}

  /**
   * Login with email and password
   * 
   * @param loginDto The data to login with
   * @returns JSON response
   */
  @Public()
  @Post('login')
  @ApiParam({name: 'loginDto', type: LoginDto})

  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  /**
   * Returns the profile of the user that is logged in
   * 
   * @returns JSON response
   */
  
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user)
    return req.user;
  }

  /**
   * Updates the profile of the user that is logged in
   * 
   * @returns JSON response
   */

  @Patch('profile')
  patchProfile(@Request() req) {
    return this.userService.update(req.user.id, req.body);
  }

  /**
   * Deletes the profile of the user that is logged in
   * 
   * @returns JSON response
   */

  @Delete('profile')
  deleteProfile(@Request() req) {
    return this.userService.remove(req.user.id);
  }

}
