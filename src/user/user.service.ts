import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {


  constructor(private readonly db: PrismaService) {}
  

  async getUserByToken(token: string) {
    const tokenObj = await this.db.token.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!tokenObj) {
      return null;
    }
    const user = tokenObj.user;
    delete user.password;
    return user;

  }
  
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


  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findUnique({
      where: {id}
    });
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
