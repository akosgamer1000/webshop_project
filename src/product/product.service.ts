import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product, Type } from '@prisma/client';
import { isNil } from 'lodash';


@Injectable()
export class ProductService {


  constructor(private readonly db: PrismaService) { }


  create(createProductDto: CreateProductDto) {
    return this.db.product.create({
      data: {
        name: createProductDto.name,
        type: createProductDto.type,
        price: createProductDto.price,
        imgSrc: createProductDto.imgSrc,
        manufacturer: createProductDto.manufacturer,
        couantity: createProductDto.couantity,
        Processor: createProductDto.Processor ? { create: createProductDto.Processor } : undefined,
        Memory: createProductDto.Memory ? { create: createProductDto.Memory } : undefined,
        HardDrive: createProductDto.HardDrive ? { create: createProductDto.HardDrive } : undefined,
        VideoCard: createProductDto.VideoCard ? { create: createProductDto.VideoCard } : undefined,
        Motherboard: createProductDto.Motherboard ? { create: createProductDto.Motherboard } : undefined,
        CPUCooler: createProductDto.CPUCooler ? { create: createProductDto.CPUCooler } : undefined,
        PowerSupply: createProductDto.PowerSupply ? { create: createProductDto.PowerSupply } : undefined,
        Powerhouse: createProductDto.Powerhouse ? { create: createProductDto.Powerhouse } : undefined,
      },
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
  }

  //   applyFilters(products, query) {
  //     if (!query.search) {
  //         return products;
  //     }

  //     // Ensure search term is extracted properly
  //     query.search = query.search.split('=')[1]
  //     const filters = query.search.toLowerCase().split('+').filter(term => term.trim() !== "");

  //     if (filters.length === 0) {
  //         return products; // If no valid filters, return all products
  //     }

  //     // Use `.filter` to avoid redundant iterations
  //     return products.filter(product => {
  //         return filters.some(filter => 
  //             product.name.toLowerCase().includes(filter) ||
  //             product.type.toLowerCase().includes(filter) ||
  //             product.manufacturer.toLowerCase().includes(filter)
  //         );
  //     });
  // }

  async search(query: string) {

    const formattedQuery = query.toUpperCase();

    const isValidEnum = Object.values(Type).includes(formattedQuery as Type);
    const products = await this.db.product.findMany({
      where: {
        OR: [
          { name: { contains: query.toLowerCase() } },
          isValidEnum ? { type: { equals: formattedQuery as Type } } : {},
          { manufacturer: { contains: query.toLowerCase() } }
        ]
      }
    });


    return products.map(product => {
      return Object.fromEntries(
        Object.entries(product).filter(([_, value]) => !isNil(value))
      );
    })
  }

  async findAll(req) {
    const products = await this.db.product.findMany({
      include: {
        Processor: true,
        Memory: true,
        HardDrive: true,
        VideoCard: true,
        Motherboard: true,
        CPUCooler: true,
        PowerSupply: true,
        Powerhouse: true
      }
    });


    return products.map(product =>
      Object.fromEntries(
        Object.entries(product).filter(([_, value]) => value !== null)
      )
    );
  }


  filterTypes(filterBy: keyof Product) {
    return this.db.product.groupBy({
      by: filterBy
    })
  }

  filterTypesWhere(filterBy: keyof Product, type: Type) {
    return this.db.product.groupBy({
      by: filterBy,
      where: { type: type },
    })
  }

  async findOne(id: number) {
    const product = await this.db.product.findUnique({
      where: {
        id: id
      },
      include: {
        Processor: true,
        Memory: true,
        HardDrive: true,
        VideoCard: true,
        Motherboard: true,
        CPUCooler: true,
        PowerSupply: true,
        Powerhouse: true
      }
    });
    return Object.fromEntries(
      Object.entries(product).filter(([key, value]) => value !== null)
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.db.product.update({
      where: { id: id },
      data: {
        name: updateProductDto.name,
        type: updateProductDto.type,
        price: updateProductDto.price,
        couantity: updateProductDto.couantity,
        Processor: updateProductDto.Processor ? { update: updateProductDto.Processor } : undefined,
        Memory: updateProductDto.Memory ? { update: updateProductDto.Memory } : undefined,
        HardDrive: updateProductDto.HardDrive ? { update: updateProductDto.HardDrive } : undefined,
        VideoCard: updateProductDto.VideoCard ? { update: updateProductDto.VideoCard } : undefined,
        Motherboard: updateProductDto.Motherboard ? { update: updateProductDto.Motherboard } : undefined,
        CPUCooler: updateProductDto.CPUCooler ? { update: updateProductDto.CPUCooler } : undefined,
        PowerSupply: updateProductDto.PowerSupply ? { update: updateProductDto.PowerSupply } : undefined,
        Powerhouse: updateProductDto.Powerhouse ? { update: updateProductDto.Powerhouse } : undefined,
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
