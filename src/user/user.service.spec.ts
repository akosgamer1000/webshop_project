import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto = {
        name: 'Bármi Áron',
        email: 'barmiAron@example.com',
        password: 'Asd1234.',
        address: 'sesame street 0',
        role: 'user',
      };

      mockPrismaService.user.findUnique.mockResolvedValue(null); // No existing user with this email
      mockPrismaService.user.create.mockResolvedValue({ ...createUserDto, id: 1 });

      const result = await service.create(createUserDto);
      delete createUserDto.password

      expect(result).toEqual({ ...createUserDto, id: 1 });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: { ...createUserDto, password: expect.any(String) },
      });
    });

    it('should throw error if email already exists', async () => {
      const createUserDto = {
        name: 'Bármi Áron',
        email: 'barmiAron@example.com',
        password: 'Asd1234.',
        address: 'sesame street 0',
        role: 'user',
      };

      mockPrismaService.user.findUnique.mockResolvedValue({ email: 'barmiAron@example.com' }); // Email already exists

      await expect(service.create(createUserDto)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, name: 'Bármi Áron', email: 'barmiAron@example.com', role: 'user', password: 'hashedPassword', address: 'sesame street 0' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'admin', password: 'hashedPassword', address: '123 Main St' },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();

      expect(result).toEqual([
        { id: 1, name: 'Bármi Áron', email: 'barmiAron@example.com', role: 'user', address: 'sesame street 0' },
        { id: 2, name: 'John Doe', email: 'john@example.com', role: 'admin', address: '123 Main St' },
      ]);
      expect(mockPrismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { id: 1, name: 'Bármi Áron', email: 'barmiAron@example.com', role: 'user', password: 'hashedPassword', address: 'sesame street 0' };

      mockPrismaService.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne(1);

      expect(result).toEqual({ id: 1, name: 'Bármi Áron', email: 'barmiAron@example.com', role: 'user', address: 'sesame street 0' });
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw error if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Updated Name', email: 'updated@example.com' };
      const updatedUser = { id: 1, name: 'Updated Name', email: 'updated@example.com', role: 'user', password: 'hashedPassword', address: 'sesame street 0' };

      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateUserDto);

      expect(result).toEqual({ id: 1, name: 'Updated Name', email: 'updated@example.com', role: 'user', address: 'sesame street 0' });
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
    });

    it('should throw error if update fails', async () => {
      const updateUserDto = { name: 'Updated Name', email: 'updated@example.com' };

      mockPrismaService.user.update.mockRejectedValue(new Error('Error updating user'));

      await expect(service.update(1, updateUserDto)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const user = { id: 1, name: 'Bármi Áron', email: 'barmiAron@example.com', role: 'user', password: 'hashedPassword', address: 'sesame street 0' };

      mockPrismaService.user.delete.mockResolvedValue(user);

      const result = await service.remove(1);

      expect(result).toEqual(user);
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw error if remove fails', async () => {
      mockPrismaService.user.delete.mockRejectedValue(new Error('Error deleting user'));

      await expect(service.remove(1)).rejects.toThrowError(BadRequestException);
    });
  });
});
