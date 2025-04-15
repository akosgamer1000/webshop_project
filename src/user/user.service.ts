import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {

  constructor(private readonly db: PrismaService) { }

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const email = await this.db.user.findUnique({
      where: { email: createUserDto.email }
    });
    if (email) {
      throw new BadRequestException({ errors: { email: "user already exists" } });
    }

    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword
      }
    });

    // Remove password from the response
    if (user?.password) {
      delete user.password;
    }

    return user;
  }

  // Get all users
  async findAll() {
    const users = await this.db.user.findMany();
    users.forEach(user => {
      if (user?.password) {
        delete user.password;
      }
    });
    return users;
  }

  // Get a single user by ID
  async findOne(id: number) {
    const user = await this.db.user.findUnique({
      where: { id: id }
    });

    // Check if user exists
    if (!user) {
      throw new BadRequestException({ errors: { id: "User not found" } });
    }

    // Remove password from the response
    if (user?.password) {
      delete user.password;
    }

    return user;
  }

  // Update a user's data
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.db.user.update({
        where: { id },
        data: updateUserDto
      });

      // Remove password from the response
      if (updatedUser?.password) {
        delete updatedUser.password;
      }

      return updatedUser;
    } catch (error) {
      throw new BadRequestException({ errors: { id: "User update failed" } });
    }
  }

  // Remove a user by ID
  async remove(id: number) {
    try {
      const user = await this.db.user.delete({
        where: { id }
      });

      return user;
    } catch (error) {
      throw new BadRequestException({ errors: { id: "User removal failed" } });
    }
  }
}
