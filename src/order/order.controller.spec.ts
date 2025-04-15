import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('OrderController', () => {
  let app: INestApplication;
  let orderService: OrderService;

  const mockOrderService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateItemInOrder: jest.fn(),
    removeItemFromOrder: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: UserService, useValue: {} },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(() => jest.clearAllMocks());

  it('POST /order - should create a new order', async () => {
    const createDto = {
      email: 'barmiAron@example.com',
      address: '123 Main St',
      products: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ],
    };
  
    const expectedResult = {
      id: 1,
      ...createDto,
      createdAt: new Date().toISOString(), // optional if your response includes timestamps
    };
  
    mockOrderService.create.mockResolvedValue(expectedResult);
  
    const res = await request(app.getHttpServer())
      .post('/order')
      .send(createDto)
      .expect(201);
  
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      email: createDto.email,
      address: createDto.address,
      products: expect.any(Array),
    });
  
    expect(mockOrderService.create).toHaveBeenCalledWith(createDto);
  });
  

  it('GET /order - should return all orders', async () => {
    const mockOrders = [{ id: 1 }, { id: 2 }];
    mockOrderService.findAll.mockResolvedValue(mockOrders);

    const res = await request(app.getHttpServer())
      .get('/order')
      .expect(200);

    expect(res.body).toEqual(mockOrders);
  });

  it('GET /order/:id - should return a specific order', async () => {
    const mockOrder = { id: 1 };
    mockOrderService.findOne.mockResolvedValue(mockOrder);

    const res = await request(app.getHttpServer())
      .get('/order/1')
      .expect(200);

    expect(res.body).toEqual(mockOrder);
    expect(mockOrderService.findOne).toHaveBeenCalledWith(1);
  });


  it('PATCH /order/:orderId/removeFromOrder/:productId - should remove item from order', async () => {
    const result = { id: 1, removedProductId: 2 };

    mockOrderService.removeItemFromOrder.mockResolvedValue(result);

    const res = await request(app.getHttpServer())
      .patch('/order/1/removeFromOrder/2')
      .expect(200);

    expect(res.body).toEqual(result);
    expect(mockOrderService.removeItemFromOrder).toHaveBeenCalledWith(1, 2);
  });

  it('DELETE /order/:id - should delete an order', async () => {
    const deletedOrder = { id: 1 };
    mockOrderService.remove.mockResolvedValue(deletedOrder);

    const res = await request(app.getHttpServer())
      .delete('/order/1')
      .expect(200);

    expect(res.body).toEqual(deletedOrder);
    expect(mockOrderService.remove).toHaveBeenCalledWith(1);
  });

  afterAll(async () => {
    await app.close();
  });
});
