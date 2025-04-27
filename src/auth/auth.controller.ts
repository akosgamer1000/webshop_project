import { Body, Controller, Get, Post, UnauthorizedException, Request, Patch, Delete, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { UserService } from '../user/user.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
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
  @ApiResponse({ status: 201, description: 'Returns the access token of the user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'The supplied data is invalid' })

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
  @ApiResponse({ status: 201, description: 'Returns the user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  getProfile(@Request() req) {
    return req.user;
  }

  /**
   * Returns the orders of the user that is logged in
   * 
   * @returns JSON response
   */
  @Get('profile/orders')
  getOrders(@Request() req) {
    return this.authService.getOrders(req.user.id);
  }


  /**
   * Updates the profile of the user that is logged in
   * 
   * @returns JSON response
   */
  @Patch('profile')
  @ApiParam({ name: 'updateUserDto', type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Returns the access token of the updated user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'The supplied data is invalid' })
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
   * Changes the password of the user that is logged in
   * 
   * @param req 
   * @param oldPasword 
   * @param newPassword 
   * @returns 
   */

  @ApiParam({ name: 'oldPassword', type: String, example: "Asd1234." })
  @ApiParam({ name: 'newPassword', type: String, example: "Dsa4321." })

  @ApiResponse({ status: 200, description: 'Returns the access token of the updated user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'The supplied data is invalid' })
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
   * @param req The request object
   * @param password The password of the user
   * @returns JSON response
   */
  @ApiParam({ name: 'password', type: String, example: "Asd1234." })
  @ApiResponse({ status: 200, description: 'Returns the access token of the updated user' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'The supplied data is invalid' })
  @Delete('profile')
  async deleteProfile(@Request() req, @Body() password: DeleteProfile) {
    try {
      return await this.authService.remove(req.user.id, password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

}
