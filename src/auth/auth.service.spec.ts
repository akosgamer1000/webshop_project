import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

// Mock the PrismaService and JwtService
const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    findFirstOrThrow: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const mockJwtService = {
  signAsync: jest.fn().mockResolvedValue('mocked-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('update()', () => {
    it('should update user and return new JWT token', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', role: 'user' };
      const updateDto = { name: 'John Updated', address: '456 New St' };

      mockPrismaService.user.update.mockResolvedValue(mockUser);

      const response = await service.update(1, updateDto);
      expect(response).toHaveProperty('access_token');
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({
        id: mockUser.id,
        username: mockUser.name,
        email: mockUser.email,
        address: mockUser.address,
        role: mockUser.role,
      });
    });
  });

  describe('changePassword()', () => {
    it('should change password and return new JWT token', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: await argon2.hash('oldPassword123') };
      const changePasswordDto = { oldPassword: 'oldPassword123', newPassword: 'newPassword123' };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue(mockUser);

      const response = await service.changePassword(1, changePasswordDto);
      expect(response).toHaveProperty('access_token');
      expect(mockJwtService.signAsync).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException for invalid old password', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: await argon2.hash('oldPassword123') };
      const changePasswordDto = { oldPassword: 'wrongOldPassword', newPassword: 'newPassword123' };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.changePassword(1, changePasswordDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login()', () => {
 

    it('should throw UnauthorizedException for invalid password', async () => {
      const loginDto = { email: 'john@example.com', password: 'wrongPassword' };
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: await argon2.hash('password123') };

      mockPrismaService.user.findFirstOrThrow.mockResolvedValue(mockUser);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
