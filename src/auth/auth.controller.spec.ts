// src/auth/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { DeleteProfile } from './dto/deleteprofile.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn(),
      update: jest.fn(),
      changePassword: jest.fn(),
      remove: jest.fn(),
    };

    mockUserService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should login successfully with valid credentials', async () => {
    const loginDto: LoginDto = { email: 'test@test.com', password: 'password123' };
    (mockAuthService.login as jest.Mock).mockResolvedValue({ token: 'jwt_token' });

    const result = await controller.login(loginDto);
    expect(result).toEqual({ token: 'jwt_token' });
  });

  it('should throw UnauthorizedException on invalid login', async () => {
    (mockAuthService.login as jest.Mock).mockRejectedValue(new Error());

    await expect(controller.login({ email: '', password: '' })).rejects.toThrow(UnauthorizedException);
  });

  it('should return the user profile', () => {
    const mockRequest = { user: { id: 1, email: 'user@test.com' } };
    const result = controller.getProfile(mockRequest);
    expect(result).toEqual(mockRequest.user);
  });

  it('should update profile excluding email, password, and role', async () => {
    const updateDto: UpdateUserDto = {
      name: 'updatedUser',
      email: 'should@not.change', // will be deleted
      password: 'hidden',         // will be deleted
      role: 'admin',              // will be deleted
    };
    const mockRequest = { user: { id: 1 } };
    const expectedDto = { name: 'updatedUser' };

    (mockAuthService.update as jest.Mock).mockResolvedValue({ success: true });

    const result = await controller.patchProfile(mockRequest, updateDto);
    expect(mockAuthService.update).toHaveBeenCalledWith(1, expectedDto);
    expect(result).toEqual({ success: true });
  });

  it('should throw BadRequestException if updateUserDto is missing', async () => {
    const mockRequest = { user: { id: 1 } };
    await expect(controller.patchProfile(mockRequest, null)).rejects.toThrow('one of the fields should not be empty');
  });

  it('should call changePassword with correct values', async () => {
    const dto: ChangePasswordDto = { oldPassword: 'old', newPassword: 'new' };
    const mockRequest = { user: { id: 1 } };

    (mockAuthService.changePassword as jest.Mock).mockResolvedValue({ success: true });

    const result = await controller.changePassword(mockRequest, dto);
    expect(mockAuthService.changePassword).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual({ success: true });
  });

  it('should throw UnauthorizedException if password change fails', async () => {
    const dto: ChangePasswordDto = { oldPassword: 'bad', newPassword: 'new' };
    const mockRequest = { user: { id: 1 } };

    (mockAuthService.changePassword as jest.Mock).mockRejectedValue(new Error());

    await expect(controller.changePassword(mockRequest, dto)).rejects.toThrow(UnauthorizedException);
  });

  it('should call remove when deleting profile', async () => {
    const password: DeleteProfile = { password: 'secure' };
    const mockRequest = { user: { id: 1 } };

    (mockAuthService.remove as jest.Mock).mockResolvedValue({ success: true });

    const result = await controller.deleteProfile(mockRequest, password);
    expect(mockAuthService.remove).toHaveBeenCalledWith(1, password);
    expect(result).toEqual({ success: true });
  });

  it('should throw UnauthorizedException if profile deletion fails', async () => {
    const password: DeleteProfile = { password: 'fail' };
    const mockRequest = { user: { id: 1 } };

    (mockAuthService.remove as jest.Mock).mockRejectedValue(new Error("Invalid password"));

    await expect(controller.deleteProfile(mockRequest, password)).rejects.toThrow(UnauthorizedException);
  });
});
