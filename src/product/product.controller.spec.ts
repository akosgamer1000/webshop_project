import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from '../auth/role.enum';
import { Type } from '@prisma/client';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    filterTypes: jest.fn(),
    filterTypesWhere: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    search: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct with component data', () => {
    it('should handle nested component data in DTO', async () => {
      const file: any = { filename: 'nested.png' };
      const dto: CreateProductDto = {
        name: 'Nested Product',
        manufacturer: 'Stormclaw',
        type: Type.PROCESSOR,
        price: 399,
        couantity: 10,
        imgSrc: '',
        Processor: {
          id: 1,
          coreNumber: 8,
          baseFrequency: 3.5,
          turboBoostFrequency: 4.8,
          cache: 16,
          architecture: 'Zen 4',
          processorSeller: 'AMD',
          processorModel: 'Ryzen 7 7700X',
          integratedGraphicModel: 'Radeon Graphics',
          processorTechnology: '5nm',
          productId: 1,
        },
      };
  
      const expectedResult = { id: 123, ...dto, image: 'uploads/nested.png' };
      mockProductService.create.mockResolvedValue(expectedResult);
  
      const result = await controller.createProduct(file, dto);
  
      expect(mockProductService.create).toHaveBeenCalledWith(dto, 'uploads/nested.png');
      expect(result).toEqual(expectedResult);
    });
  });
  

  describe('findAll', () => {
    it('should call productService.findAll', () => {
      const mockReq = {};
      controller.findAll(mockReq);
      expect(service.findAll).toHaveBeenCalledWith(mockReq);
    });
  });

  describe('search', () => {
    it('should call search when query param exists', () => {
      const mockReq = { query: { search: 'cpu' } };
      controller.search(mockReq);
      expect(service.search).toHaveBeenCalledWith('cpu');
    });

    it('should call findAll when no query param exists', () => {
      const mockReq = { query: {} };
      controller.search(mockReq);
      expect(service.findAll).toHaveBeenCalledWith(mockReq);
    });
  });

  describe('findOne', () => {
    it('should return one product by id', () => {
      controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('filters', () => {
    it('should call filterTypes with filter', () => {
      controller.filters('type' as any);
      expect(service.filterTypes).toHaveBeenCalledWith('type');
    });
  });

  describe('filtersWhere', () => {
    it('should call filterTypesWhere with filter and where', () => {
      controller.filtersWhere('type' as any, Type.VIDEOCARD);
      expect(service.filterTypesWhere).toHaveBeenCalledWith('type', Type.VIDEOCARD);
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const dto: UpdateProductDto = { name: 'Updated Product' };
      controller.update(1, dto);
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should delete a product by id', () => {
      controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
