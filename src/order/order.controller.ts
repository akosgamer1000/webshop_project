import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from '../user/user.service';

@Controller('order')
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService
  ) { }

  @Public()
  @Post()
  async create( @Body() createOrderDto: CreateOrderDto) {

    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  updateItemInOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateItemInOrder(+id, updateOrderDto);
  }

  @Patch(':orderId/removeFromOrder/:productId')
  removeItemFromOrder(@Param('orderId', ParseIntPipe) id: string, @Param('productId', ParseIntPipe) productId: string) {
    console.log("asd")
    return this.orderService.removeItemFromOrder(+id, +productId)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
