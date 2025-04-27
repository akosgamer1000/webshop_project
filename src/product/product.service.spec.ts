import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let prismaService: PrismaService;

  // Mock data for testing
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    manufacturer: 'Test Manufacturer',
    type: 'PROCESSOR',
    price: 100,
    couantity: 10,
    imgSrc: 'test-image.png',
    Processor: { id: 1, coreNumber: 4, baseFrequency: 3.5, turboBoostFrequency: 4.0, cache: 8, architecture: 'x64', processorSeller: 'Intel', processorModel: 'i7-9700K', integratedGraphicModel: 'UHD 630', processorTechnology: '14nm', productId: 1 },
    Memory: { id: 1, memoryCapacity: 16, memoryType: 'DDR4', installedMemory: 16, frequency: 3200, supportedMemoryCapacity: 64, productId: 1 }
  };

  const mockCreateProductDto: CreateProductDto = {
    name: 'Test Product',
    manufacturer: 'Test Manufacturer',
    type: 'PROCESSOR',
    price: 100,
    quantity: 10,
    imgSrc: 'test-image.png',
    Processor: { id: 2, coreNumber: 8, baseFrequency: 3.5, turboBoostFrequency: 4.5, cache: 12, architecture: 'x64', processorSeller: 'Intel', processorModel: 'i9-10900K', integratedGraphicModel: 'UHD 630', processorTechnology: '14nm', productId: 1 },
    Memory: {
        memoryCapacity: 32, memoryType: 'DDR4', installedMemory: 32, frequency: 3200, supportedMemoryCapacity: 64, productId: 1,
        id: 0
    }
  };

  const mockUpdateProductDto: UpdateProductDto = {
    name: 'Updated Test Product',
    manufacturer: 'Updated Manufacturer',
    type: 'MEMORY',
    price: 120,
    quantity: 5,
    imgSrc: 'updated-image.png',
    Processor: {
        coreNumber: 8, baseFrequency: 3.7, turboBoostFrequency: 4.8, cache: 16, architecture: 'x64', processorSeller: 'Intel', processorModel: 'i9-11900K', integratedGraphicModel: 'UHD 750', processorTechnology: '14nm', productId: 1,
        id: 0
    },
    Memory: {
        memoryCapacity: 64, memoryType: 'DDR4', installedMemory: 64, frequency: 3600, supportedMemoryCapacity: 128, productId: 1,
        id: 0
    }
  };

  const prismaServiceMock = {
    product: {
      create: jest.fn().mockResolvedValue(mockProduct),
      findMany: jest.fn().mockResolvedValue([mockProduct]),
      findUnique: jest.fn().mockResolvedValue(mockProduct),
      update: jest.fn().mockResolvedValue(mockProduct),
      delete: jest.fn().mockResolvedValue(mockProduct),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProduct]);
      expect(prismaService.product.findMany).toHaveBeenCalledWith({
        include: {
          Processor: true,
          Memory: true,
          HardDrive: true,
          VideoCard: true,
          Motherboard: true,
          CPUCooler: true,
          PowerSupply: true,
          Powerhouse: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          Processor: true,
          Memory: true,
          HardDrive: true,
          VideoCard: true,
          Motherboard: true,
          CPUCooler: true,
          PowerSupply: true,
          Powerhouse: true,
        },
      });
    });
  });
  describe('remove', () => {
    it('should remove and return the deleted product', async () => {
      const result = await service.remove(1);
      expect(result).toEqual(mockProduct);
      expect(prismaService.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
