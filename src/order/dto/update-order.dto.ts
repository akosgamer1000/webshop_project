import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { Status } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    status : Status
}
