import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../auth/role.enum';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const mockUserService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should successfully create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Bármi Áron',
        email: 'barmiAron@example.com',
        password: 'Asd1234.',
        address: 'Sesame Street 0',
        role: Role.USER, // Use Role enum, not string
      };
      
      const createdUser = { ...createUserDto, id: 1 };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(createdUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: 'Bármi Áron',
          email: 'barmiAron@example.com',
          password: 'Asd1234.',
          address: 'Sesame Street 0',
          role: Role.USER, // Use Role enum, not string
        },
        {
          id: 2,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123.',
          address: 'Elm Street 42',
          role: Role.ADMIN, // Use Role enum, not string
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll({ user: { role: Role.ADMIN } });
      expect(result).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = {
        id: 1,
        name: 'Bármi Áron',
        email: 'barmiAron@example.com',
        password: 'Asd1234.',
        address: 'Sesame Street 0',
        role: Role.USER, // Use Role enum, not string
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      const result = await controller.findOne(1);
      expect(result).toEqual(user);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw error if user is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      try {
        await controller.findOne(999);
      } catch (error) {
        expect(error.response.statusCode).toBe(404);
      }
    });
  });

//   describe('update', () => {
//     it('should update and return the updated user', async () => {
//       const updateUserDto: UpdateUserDto = {
//         name: 'Updated Name',
//         email: 'updated@example.com',
//         password: 'Updated123.',
//         address: 'Updated Street 123',
//         role: Role.ADMIN, // Use Role enum, not string
//       };
//       const updatedUser = { id: 1, ...updateUserDto };
//       jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

//       const result = await controller.update(1, updateUserDto);
//       expect(result).toEqual(updatedUser);
//       expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
//     });
//   });

//   describe('remove', () => {
//     it('should delete the user', async () => {
//       jest.spyOn(service, 'remove').mockResolvedValue('User deleted');

//       const result = await controller.remove(1);
//       expect(result).toBe('User deleted');
//       expect(service.remove).toHaveBeenCalledWith(1);
//     });
//   });
});
