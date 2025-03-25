import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserReq } from 'src/user/entities/userReq.entity';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('product')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Public()
  @Get('types')
  findTypes() {
    return this.productService.findTypes()
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
