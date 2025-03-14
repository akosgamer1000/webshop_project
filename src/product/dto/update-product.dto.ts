import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { CartItem, OrderItem } from '@prisma/client';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    // cartItem? : CartItem
    // orderItem? : OrderItem
}
