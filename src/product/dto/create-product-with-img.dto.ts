import { ApiProperty } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto'; // adjust path if needed

export class CreateProductWithImageDto extends CreateProductDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file of the product'
  })
  image: any;
}