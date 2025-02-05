import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

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

  @Post()
  @ApiResponse({ status: 200, description: 'The created user'})
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
  @ApiResponse({ status: 200, description: 'The data of the users'})
  findAll() {
    return this.userService.findAll();
  }


  /**
   * Returns a user by ID
   * 
   * @param id The unique ID of the user
   * @returns JSON response
   */

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique ID of the user'
  })
  @ApiResponse({status: 200, description: 'The user with the given ID'})
  @ApiBadRequestResponse({description: 'The supplied data is invalid'})
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  /**
   * Updates a user by ID
   * 
   * @param id The unique ID of the user
   * @param updateUserDto The data to update
   * @returns JSON response
   */

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique ID of the user'
  })
  @ApiResponse({status: 200, description: 'The updated user'})
  @ApiBadRequestResponse({description: 'The supplied data is invalid'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * Deletes a user by ID
   * 
   * @param id The unique ID of the user
   * @returns JSON response
   */

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique ID of the user'
  })
  @ApiResponse({status: 200, description: 'The deleted user'})
  @ApiBadRequestResponse({description: 'The supplied data is invalid'})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
