import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import * as crypto from 'node:crypto';

@Injectable()
export class AuthService {
    constructor(private readonly db: PrismaService) {}
    

  async login(loginDto: LoginDto) {
    const user = await this.db.user.findFirstOrThrow({
        where: {email: loginDto.email}
    })
    console.log(user);
    if (await argon2.verify(user.password, loginDto.password)) {
        const token = crypto.randomBytes(32).toString('hex');
        await this.db.token.create({
            data: {
                token,
                user: {connect: {id: user.id}}
            }
        });
        return {
            token,
            userui: user.id
        }
    }
    else {
        throw new Error('Invalid password');
    }
  }
}
