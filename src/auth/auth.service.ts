import { BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { DeleteProfile } from './dto/deleteprofile.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly db: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    private async verifyPassword(userId: number, password: string): Promise<boolean> {
        const user = await this.db.user.findUnique({
            where: { id: userId }
        });
        return await argon2.verify(user.password, password);
    }

    async getOrders(userId: number) {
        const user = await this.db.user.findUnique({
            where: { id: userId },
            include: { orders: {
                include: {
                    products: true,
                }
            } }
        });
        return user.orders;
    }

    async remove(id: number, password: DeleteProfile) {
        const user = await this.db.user.findUnique({
            where: { id }
        });
        delete user.password

        if (!await this.verifyPassword(user.id, password.password)) {
            throw new UnauthorizedException('Invalid password');
        }

        return this.db.user.delete({
            where: { id }
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.db.user.update({
            where: { id },
            data: updateUserDto
        });

        const payload = { id: user.id, username: user.name, email: user.email, address: user.address, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
        const user = await this.db.user.findUnique({
            where: { id }
        });

        if (!await this.verifyPassword(user.id, changePasswordDto.oldPassword)) {
            throw new UnauthorizedException('Invalid password');
        }

        const hashedPassword = await argon2.hash(changePasswordDto.newPassword);

        await this.db.user.update({
            where: { id },
            data: { password: hashedPassword }
        });

        const payload = { id: user.id, username: user.name, email: user.email, address: user.address, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.db.user.findFirstOrThrow({
            where: { email: loginDto.email }
        });

        if (!await this.verifyPassword(user.id, loginDto.password)) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { id: user.id, username: user.name, email: user.email, address: user.address, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
