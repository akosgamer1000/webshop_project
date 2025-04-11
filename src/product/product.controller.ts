import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from 'src/auth/role.enum';
import { Public } from 'src/auth/decorators/public.decorator';
import { Product, Type } from '@prisma/client';
import { extname } from 'path';


@Controller('products')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const imagePath = file ? `uploads/${file.filename}` : undefined;
    return this.productService.create(createProductDto, imagePath);
  }
  @Public()
  @Get('search')
  search(@Request() req) {
    const query = req.query.search
    console.log(query)
    if(query) {
      return this.productService.search(query)
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
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(+id);
  }

  /**
     * 
     * @param productId 
     * @returns 
     */


}
