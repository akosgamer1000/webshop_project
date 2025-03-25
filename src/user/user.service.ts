import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';



@Injectable()
export class UserService {

  constructor(private readonly db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = await this.db.user.create({
      data : {
        ...createUserDto,
        password: hashedPassword
      }
    });
    delete user.password;

    
    return user;
  }


  async findAll() {
    const users = await this.db.user.findMany();
    users.forEach(user => {
      delete user.password;
    });

    return users;

  }

  async findOne(id: number) {
    const user = await this.db.user.findUnique({
      where: {id : id}
    });
    delete user.password
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: {id},
      data: updateUserDto
    });
  }

  remove(id: number) {
    return this.db.user.delete({
      where: {id}
    });
  }
}
