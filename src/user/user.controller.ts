import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/role.enum';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  

  /**
   * Creates a new user
   * 
   * @param createUserDto The data to post
   * @returns JSON response
   */
  @Public()
  @Post()
  @ApiResponse({ status: 201, description: 'The created user'})
  @ApiBadRequestResponse({ description: 'The supplied data was invalid'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Returns all users
   * 
   * @returns JSON response
   */

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 200, description: 'The data of the users'})
  findAll(@Request() req) {
    const user = req.user;
    console.log(user)
    return this.userService.findAll();
  }

  /**
   * Returns a user by ID
   * 
   * @param id The unique ID of the user
   * @returns JSON response
   */

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique ID of the user'
  })
  @ApiResponse({status: 200, description: 'The user with the given ID'})
  @ApiBadRequestResponse({description: 'The supplied data is invalid'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id)
    return this.userService.findOne(id);        
  }  

  /**
   * Updates a user by ID
   * 
   * @param id The unique ID of the user
   * @param updateUserDto The data to update
   * @returns JSON response
   */
  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique ID of the user'
  })
  @ApiResponse({status: 200, description: 'The updated user'})
  @ApiBadRequestResponse({description: 'The supplied data is invalid'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }



  /**
   * Deletes a user by ID
   * 
   * @param id The unique ID of the user
   * @returns JSON response
   */
  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique ID of the user'
  })
  @ApiResponse({status: 200, description: 'The deleted user'})
  @ApiBadRequestResponse({description: 'The supplied data is invalid'})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
