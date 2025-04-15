import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrderService', () => {
  let service: OrderService;
  let prisma: PrismaService;

  const mockPrismaService = {
    product: {
      findUnique: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
    order: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    orderItem: {
      count: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an order for an existing user', async () => {
      const dto: CreateOrderDto = {
        email: 'test@example.com',
        address: '123 Main St',
        products: [{ productId: 1, quantity: 2 }],
      };

      mockPrismaService.product.findUnique.mockResolvedValue({ price: 100 });
      mockPrismaService.user.findUnique.mockResolvedValue({ email: dto.email });
      mockPrismaService.order.create.mockResolvedValue({ id: 1, totalPrice: 200 });

      const result = await service.create(dto);

      expect(result).toEqual({ id: 1, totalPrice: 200 });
      expect(mockPrismaService.order.create).toHaveBeenCalled();
    });

    it('should create an order for a guest user', async () => {
      const dto: CreateOrderDto = {
        email: 'guest@example.com',
        address: '456 Guest Ave',
        products: [{ productId: 2, quantity: 1 }],
      };

      mockPrismaService.product.findUnique.mockResolvedValue({ price: 50 });
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.order.create.mockResolvedValue({ id: 2, totalPrice: 50 });

      const result = await service.create(dto);

      expect(result).toEqual({ id: 2, totalPrice: 50 });
      expect(mockPrismaService.order.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const orders = [{ id: 1 }, { id: 2 }];
      mockPrismaService.order.findMany.mockResolvedValue(orders);

      const result = await service.findAll();

      expect(result).toEqual(orders);
    });
  });

  describe('findOne', () => {
    it('should return one order with products', async () => {
      const order = { id: 1, products: [] };
      mockPrismaService.order.findUnique.mockResolvedValue(order);

      const result = await service.findOne(1);

      expect(result).toEqual(order);
    });
  });

  describe('updateItemInOrder', () => {
    it('should update an existing order item', async () => {
      const dto: UpdateOrderDto = {
          products: [{ productId: 1, quantity: 5 }],
          status: 'InProgress'
      };

      mockPrismaService.orderItem.count.mockResolvedValue(1);
      mockPrismaService.orderItem.findFirst.mockResolvedValue({ id: 99 });
      mockPrismaService.order.update.mockResolvedValue({ id: 1, products: [{ quantity: 5 }] });

      const result = await service.updateItemInOrder(1, dto);

      expect(result[0]).toEqual({ id: 1, products: [{ quantity: 5 }] });
    });

    it('should add a new product to the order if it does not exist', async () => {
      const dto: UpdateOrderDto = {
        products: [{ productId: 2, quantity: 3 }],
        status: 'InProgress'
    };

      mockPrismaService.orderItem.count.mockResolvedValue(0);
      mockPrismaService.order.update.mockResolvedValue({ id: 1, products: [{ productId: 2, quantity: 3 }] });

      const result = await service.updateItemInOrder(1, dto);

      expect(result[0]).toEqual({ id: 1, products: [{ productId: 2, quantity: 3 }] });
    });

    it('should update order status if no products provided', async () => {
      const dto: UpdateOrderDto = { status: 'Delivered' };

      mockPrismaService.order.update.mockResolvedValue({ id: 1, status: 'Delivered', products: [] });

      const result = await service.updateItemInOrder(1, dto);

      expect(result).toEqual({ id: 1, status: 'Delivered', products: [] });
    });
  });

  describe('removeItemFromOrder', () => {
    it('should remove item from order', async () => {
      mockPrismaService.orderItem.findFirst.mockResolvedValue({ id: 123 });
      mockPrismaService.order.update.mockResolvedValue({ id: 1, products: [] });

      const result = await service.removeItemFromOrder(1, 1);

      expect(result).toEqual({ id: 1, products: [] });
      expect(mockPrismaService.order.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete an order', async () => {
      mockPrismaService.order.delete.mockResolvedValue({ id: 1 });

      const result = await service.remove(1);

      expect(result).toEqual({ id: 1 });
    });
  });
});
