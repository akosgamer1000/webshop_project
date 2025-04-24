import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, Product, Type } from '@prisma/client';
import { isNil } from 'lodash';

@Injectable()
export class ProductService {
  constructor(private readonly db: PrismaService) {}

  async create(createProductDto: CreateProductDto, imagePath: string) {
    const product =  await this.db.product.create({
      data: {
        name: createProductDto.name,
        type: createProductDto.type,
        price: createProductDto.price,
        imgSrc: createProductDto.imgSrc || imagePath,
        manufacturer: createProductDto.manufacturer,
        quantity: createProductDto.quantity, // This should be `quantity` instead
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

    return Object.fromEntries(
      Object.entries(product).filter(([key, value]) => value !== undefined),
    );
  }

  async search(search: string) {
    let formattedQuery = search.toUpperCase();

    // Match known enum type
    const matchedType = Object.values(Type).find((value) =>
      value.toUpperCase().includes(formattedQuery),
    );
    const isValidEnum = Boolean(matchedType);
    if (isValidEnum) {
      formattedQuery = matchedType as Type;
    }

    const words = search ? search.trim().split(/\s+/) : [];

    const andFilters: Prisma.ProductWhereInput[] = [];

    let minPrice: number | null = null;
    let maxPrice: number | null = null;

    for (const word of words) {
      const lowerWord = word.toLowerCase();

      let isPriceWord = false;

      if (lowerWord.startsWith('>')) {
        const price = parseFloat(lowerWord.replace('>', '').replace('$', '').trim());
        if (!isNaN(price)) {
          minPrice = price;
          isPriceWord = true;
        }
      } else if (lowerWord.startsWith('<')) {
        const price = parseFloat(lowerWord.replace('<', '').replace('$', '').trim());
        if (!isNaN(price)) {
          maxPrice = price;
          isPriceWord = true;
        }
      } else if (lowerWord.includes('-')) {
        const [min, max] = lowerWord.split('-').map((val) => parseFloat(val.replace('$', '').trim()));
        if (!isNaN(min) && !isNaN(max)) {
          minPrice = min;
          maxPrice = max;
          isPriceWord = true;
        }
      }

      if (isPriceWord) {
        // Skip word-based filters for price keywords
        continue;
      }

      // Otherwise, treat it as a normal word
      const wordFilters: Prisma.ProductWhereInput[] = [
        { name: { contains: lowerWord } },
        { manufacturer: { contains: lowerWord } },
      ];

      const matchingEnum = Object.values(Type).find((t) =>
        t.toUpperCase().includes(word.toUpperCase()),
      );
      if (matchingEnum) {
        wordFilters.push({ type: { equals: matchingEnum as Type } });
      }

      andFilters.push({ OR: wordFilters });
    }

    // Add price filter if price range is found
    if (minPrice !== null || maxPrice !== null) {
      andFilters.push({
        price: {
          gte: minPrice || undefined, // Use undefined if minPrice is null
          lte: maxPrice || undefined, // Use undefined if maxPrice is null
        },
      });
    }

    const products = await this.db.product.findMany({
      where: {
        AND: andFilters,
      },
    });

    // Return products with no null values
    return products.map((product) =>
      Object.fromEntries(Object.entries(product).filter(([_, value]) => value != null)),
    );
  }

  async findAll() {
    const products = await this.db.product.findMany({
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

    return products.map((product) =>
      Object.fromEntries(Object.entries(product).filter(([_, value]) => value !== null)),
    );
  }

  filterTypes(filterBy: keyof Product) {
    return this.db.product.groupBy({
      by: [filterBy],
    });
  }

  filterTypesWhere(filterBy: keyof Product, type: Type) {
    return this.db.product.groupBy({
      by: [filterBy],
      where: { type: type },
    });
  }

  async findOne(id: number) {
    const product = await this.db.product.findUnique({
      where: {
        id: id,
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
    if (!product) {
      return new NotFoundException(`Product with id ${id} not found`);
    }
    return Object.fromEntries(
      Object.entries(product).filter(([key, value]) => value !== null),
    );
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.db.product.update({
      where: { id: id },
      data: {
        name: updateProductDto.name,
        type: updateProductDto.type,
        price: updateProductDto.price,
        quantity: updateProductDto.quantity,
        imgSrc: updateProductDto.imgSrc,
        manufacturer: updateProductDto.manufacturer,
        Processor: updateProductDto.Processor ? { update: updateProductDto.Processor } : undefined,
        Memory: updateProductDto.Memory ? { update: updateProductDto.Memory } : undefined,
        HardDrive: updateProductDto.HardDrive ? { update: updateProductDto.HardDrive } : undefined,
        VideoCard: updateProductDto.VideoCard ? { update: updateProductDto.VideoCard } : undefined,
        Motherboard: updateProductDto.Motherboard ? { update: updateProductDto.Motherboard } : undefined,
        CPUCooler: updateProductDto.CPUCooler ? { update: updateProductDto.CPUCooler } : undefined,
        PowerSupply: updateProductDto.PowerSupply ? { update: updateProductDto.PowerSupply } : undefined,
        Powerhouse: updateProductDto.Powerhouse ? { update: updateProductDto.Powerhouse } : undefined,
      },
    });
    if (!product) {
      return new NotFoundException(`Product with id ${id} not found`);
    }

    return Object.fromEntries(
      Object.entries(product).filter(([key, value]) => value !== null),
    );
  }

  async remove(id: number) {
    const deletedProduct = await this.db.product.delete({
      where: { id: id },
    });
    if (!deletedProduct) {
      return new NotFoundException(`Product with id ${id} not found`);
    }
    return deletedProduct;
  }
}
