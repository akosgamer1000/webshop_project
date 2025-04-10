import { Body, Controller, Get, Post, UnauthorizedException, Request, Patch, Delete, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiParam, ApiProperty } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { UserService } from 'src/user/user.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { update } from 'lodash';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { DeleteProfile } from './dto/deleteprofile.dto';


@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  /**
   * Login with email and password
   * 
   * @param loginDto The data to login with
   * @returns JSON response
   */
  @Public()
  @Post('login')
  @ApiParam({ name: 'loginDto', type: LoginDto })
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
    return req.user;
  }

  /**
   * Updates the profile of the user that is logged in
   * 
   * @returns JSON response
   */
  @Patch('profile')
  @ApiParam({ name: 'updateUserDto', type: UpdateUserDto })
  async patchProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto) {
      delete updateUserDto.password
      delete updateUserDto.email
      delete updateUserDto.role
      return await this.authService.update(req.user.id, updateUserDto);
    }
    else {
      throw new BadRequestException('one of the fields should not be empty')
    }




  }

  /**
   * 
   * @param req 
   * @param oldPasword 
   * @param newPassword 
   * @returns 
   */

  @ApiParam({ name: 'oldPassword', type: String, example: "Asd1234." })
  @ApiParam({ name: 'newPassword', type: String, example: "Dsa4321." })
  @ApiProperty({ name: 'oldPassword', type: String, example: "Asd1234." })
  @ApiProperty({ name: 'newPassword', type: String, example: "Dsa4321." })
  @Patch('changePassword')
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    try {
      return await this.authService.changePassword(req.user.id, changePasswordDto)
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  /**
   * Deletes the profile of the user that is logged in
   * 
   * @returns JSON response
   */

  @Delete('profile')
  async deleteProfile(@Request() req, @Body() password: DeleteProfile) {
    try {
      return await this.authService.remove(req.user.id, password);
    } catch (error) {
      console.log('asd')
      throw new UnauthorizedException('Invalid credentials');
    }
  }

}
