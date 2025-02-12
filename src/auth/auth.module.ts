import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { TokenStrategy } from './token.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService,TokenStrategy, UserService],
})
export class AuthModule {}
