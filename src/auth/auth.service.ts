import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { DeleteProfile } from './dto/deleteprofile.dto';

@Injectable()
export class AuthService {
    async remove(id: number, password: DeleteProfile) {
        const user = await this.db.user.findUnique({
            where: { id }
        });
        if (await argon2.verify(user.password, password.password)) {
            return this.db.user.delete({
                where: { id }
            });
        }
        else {
            throw new Error('Invalid password');
        }
    }


    constructor(
        private readonly db: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.db.user.update({
            where: { id },
            data: updateUserDto
        });
        const payload = { id: user.id, username: user.name, email: user.email, address: user.address, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async changePassword(id: number, changePasswprdDto: ChangePasswordDto) {

        const user = await this.db.user.findUnique({
            where: { id }
        })

        if (await argon2.verify(user.password, changePasswprdDto.oldPassword)) {
            const hashedPassword = await argon2.hash(changePasswprdDto.newPassword);

            await this.db.user.update({
                where: { id },
                data: { password: hashedPassword }
            })

            const payload = { id: user.id, username: user.name, email: user.email, address: user.address, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        }
        else {
            throw new Error('Invalid password');
        }

    }

    async login(loginDto: LoginDto) {
        const user = await this.db.user.findFirstOrThrow({
            where: { email: loginDto.email }
        })
        if (await argon2.verify(user.password, loginDto.password)) {

            const payload = { id: user.id, username: user.name, email: user.email, address: user.address, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload)
            }
        }
        else {
            throw new Error('Invalid password');
        }
    }
}
