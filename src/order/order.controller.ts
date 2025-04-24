import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from '../user/user.service';

@Controller('order')
@ApiBearerAuth()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService
  ) { }

  /**
   * Creates a new order.
   * 
   * @param createOrderDto The order to be created
   * @returns The created order
   */

  @ApiBody({type: CreateOrderDto,description: 'Create order DTO',})
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Public()
  @Post()
  async create( @Body() createOrderDto: CreateOrderDto) {

    return this.orderService.create(createOrderDto);
  }

  /**
   * Retrieves all orders.
   * 
   * @returns An array of orders
   */
  @ApiResponse({ status: 200, description: 'The orders have been successfully retrieved.' })
  @ApiResponse({ status:401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Orders not found.' })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  /**
   * Retrieves a specific order by ID.
   * 
   * @param id The ID of the order to retrieve
   * @returns The order with the specified ID
   */
  @ApiResponse({ status: 200, description: 'The order has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status:401, description: 'Unauthorized.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  /**
   * Updates a specific order by ID.
   * 
   * @param id The ID of the order to update
   * @param updateOrderDto The updated order data
   * @returns The updated order
   */
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status:401, description: 'Unauthorized.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Patch(':id')
  updateItemInOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  /**
   * Removes a specific order by ID.
   * 
   * @param id The ID of the order to remove
   * @returns The removed order
   */
  @ApiResponse({ status: 200, description: 'The order has been successfully removed.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiResponse({ status:401, description: 'Unauthorized.' })

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
