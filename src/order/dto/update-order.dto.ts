import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { Status } from '@prisma/client';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ example: "InProgress" , description: "Status of the order", enum: Status})
    status: Status
}
