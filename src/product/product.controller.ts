import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { Product, Type } from '@prisma/client';


@Controller('products')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Public()
  @Get('search')
  search(@Request() req) {
    const query = req.query.search
    const search = query.split('=')[1]

    if(req.query.search) {
      return this.productService.search(search)
    }
    return this.productService.findAll(req);
    
  }
  @Public()
  @Get()
  findAll(@Request() req) {
    return this.productService.findAll(req);
  }

  @Public()
  @Get('filter/:filter')
  filters(@Param('filter') filter: keyof Product) {
    return this.productService.filterTypes(filter)
  }

  @Public()
  @Get('filter/:filter/:where')
  filtersWhere(@Param('filter') filter: keyof Product, @Param('where') where: Type) {
    return this.productService.filterTypesWhere(filter, where)
  }

  @Public()
  @Get(':id(\\d+)+')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id(\\d+)+')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id(\\d+)+')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  /**
     * 
     * @param productId 
     * @returns 
     */


}
