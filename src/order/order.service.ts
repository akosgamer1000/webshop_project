import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { create } from 'domain';

@Injectable()
export class OrderService {

  constructor(private readonly db: PrismaService) { }


  async create(createOrderDto: CreateOrderDto) {
    const productPrices = createOrderDto.products.map(async (product) => {
      const price = await this.db.product.findUnique({
        where: {
          id: product.productId
        },
        select: {
          price: true
        }
      });
      return price.price * product.quantity;
    })

    const totalPrice = (await Promise.all(productPrices)).reduce((acc, product) => {
      return acc + product
    }, 0)

    if (await this.db.user.findUnique({
      where: { email: createOrderDto.email }
    })) {
      return this.db.order.create({
        data: {
          user: {
            connect: {
              email: createOrderDto.email,
            },
          },
          address: createOrderDto.address,
          status: "Pending",
          products: {
            create: createOrderDto.products.map((product) => {
              return {
                productId: product.productId,
                quantity: product.quantity,
              };
            }),
          },
          totalPrice: totalPrice

        },
      })
    } else {
      return this.db.order.create({
        data: {
          email: createOrderDto.email,
          address: createOrderDto.address,
          status: "Pending",
          products: {
            create: createOrderDto.products.map((product) => {
              return {
                productId: product.productId,
                quantity: product.quantity,
              };
            }),
          },
          totalPrice: totalPrice
        },
      })
    }
  }


  async findAll() {
    const orders = await this.db.order.findMany();
    if (!orders) {
      return new NotFoundException('Order not found');
    }
    return orders;
  }

  async findOne(id: number) {
    const order = await this.db.order.findUnique({
      where: {
        id: id
      },
      include: {
        products: true
      }
    });

    if (!order) {
      return new NotFoundException('Order not found');
    }
    return order;
  }



  async update(id: number, updateOrderDto: UpdateOrderDto) {

    const order = await this.db.order.update({
      where: { id },
      data: {
        status: updateOrderDto.status
      },
      include: {
        products: true
      }
    });
    if (!order) {
      return new NotFoundException('Order not found');
    }

    return order;
  }

  async remove(id: number) {
    const order = await this.db.order.delete({
      where: { id },
    })

    if (!order) {
      return new NotFoundException('Order not found');
    }
    return order;
  }
}
