import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiParam, ApiBody, ApiConsumes, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/role.enum';
import { Public } from '../auth/decorators/public.decorator';
import { Product, Type } from '@prisma/client';
import { extname } from 'path';
import { CreateProductWithImageDto } from './dto/create-product-with-img.dto';


@Controller('products')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  /**
   * Creates a new product
   * 
   * @param createProductDto The data to post
   * @returns JSON response
   */
  @ApiResponse({ status: 201, description: 'Returns the created product' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'The supplied data is invalid' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductWithImageDto })
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
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const imagePath = file ? `uploads/${file.filename}` : undefined;
    return this.productService.create(createProductDto, imagePath);
  }

  /**
   * Searches for products based on the query parameter
   * 
   * @param req the request object with the search query
   * @returns The products that match the search query
   */
  @ApiResponse({ status: 200, description: 'Returns the products that match the search query' })
  @Public()
  @Get('search')
  search(@Request() req) {
    const search = req.query.search
    if (search) {
      return this.productService.search(search)
    }
    return this.productService.findAll();
  }


  /**
   * Finds all products
   * 
   * @returns All products in the database
   */
  @ApiResponse({ status: 200, description: 'Returns all products' })
  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  /**
   * Finds the possible values for a specific field in the Product model
   * 
   * @param filter The field to filter by (e.g., 'type', 'manufacturer')
   * @returns The possible values for the specified field
   */
  @ApiParam({ name: 'filter', example: "type", required: true, description: 'The field to filter by (e.g., type, manufacturer)' })
  @Public()
  @Get('filter/:filter')
  filters(@Param('filter') filter: keyof Product) {
    return this.productService.filterTypes(filter)
  }
  /**
    * Finds the possible values for a specific field in the Product model where the value is equal to a specific type
    * 
    * @param filter The field to filter by (e.g., 'type', 'manufacturer')
    * @param where The value to filter by
    * @returns The possible values for the specified field
    */
  @ApiParam({ name: 'filter', example: "manufacturer", required: true, description: 'The field to filter by' })
  @ApiParam({ name: 'where', example: "processor", required: true, description: 'The value to filter by' })
  @ApiResponse({ status: 200, description: 'Returns the filtered products' })
  @Public()
  @Get('filter/:filter/:where')
  filtersWhere(@Param('filter') filter: keyof Product, @Param('where') where: Type) {
    return this.productService.filterTypesWhere(filter, where.toUpperCase() as Type)
  }

  /**
   * Finds a product by its ID
   * 
   * @param id The id of the product to find
   * @returns JSON response with the product data
   */
  @ApiResponse({ status: 200, description: 'Returns the product with the specified id' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', example: 1, required: true, description: 'The id of the product to find' })
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(+id);
  }

  /**
   * Updates a product by its ID
   * 
   * @param id The id of the product to update
   * @param updateProductDto The data to update the product with
   * @returns JSON response with the updated product data
   */
  @ApiResponse({ status: 200, description: 'Returns the updated product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', example: 1, required: true, description: 'The id of the product to update' })
  @ApiBody({ type: UpdateProductDto })
  @ApiBadRequestResponse({ description: 'The supplied data is invalid' })
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  /**
   * Deletes a product by its ID
   * 
   * @param id The id of the product to delete
   * @returns JSON response with the deleted product data
   */
  @ApiResponse({ status: 200, description: 'Returns the deleted product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', example: 1, required: true, description: 'The id of the product to delete' })
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
