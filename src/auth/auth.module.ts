import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';



@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6000s'},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard
    }
  ],
  exports: [AuthService],
})
export class AuthModule {}
