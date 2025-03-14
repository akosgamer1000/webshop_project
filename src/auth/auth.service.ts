import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly db: PrismaService,
        private readonly jwtService: JwtService
    ) {}
    

    async login(loginDto: LoginDto) {
    const user = await this.db.user.findFirstOrThrow({
        where: {email: loginDto.email}
    })
    if (await argon2.verify(user.password, loginDto.password)) {

        const payload = {sub: user.id, username: user.name, role: user.role};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
    else {
        throw new Error('Invalid password');
    }
  }
}
