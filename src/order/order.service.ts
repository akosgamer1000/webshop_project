import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
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
    console.log(await Promise.all(productPrices))

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
          email : createOrderDto.email,
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
          email : createOrderDto.email,
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

  findAll() {
    return this.db.order.findMany();
  }

  findOne(id: number) {
    return this.db.order.findUnique({
      where: {
        id: id
      },
      include: {
        products: true
      }
    });
  }

  updateItemInOrder(id: number, updateOrderDto: UpdateOrderDto) {
    updateOrderDto.products.map(async (product) => {
      if (await this.db.orderItem.count({
        where: {
          productId: product.productId,
          orderId: id
        }
      }) === 0) {
        console.log("Adding new product to order");
        return await this.db.order.update({
          where: { id: id },
          data: {
            products: {
              create: {
                productId: product.productId,
                quantity: product.quantity
              }
            }
          },

          include: {
            products: true
          }
        })
      }
      else {
        console.log("updating product")
        const item = await this.db.orderItem.findFirst({
          where: {
            productId: product.productId,
            orderId: id
          }
        });
        return await this.db.order.update({
          where: { id: id },
          data: {
            products: {
              update: {
                where: { id: item.id },
                data: {
                  quantity: product.quantity
                }
              }
            }
          }
        })
      }
    });
  }
  async removeItemFromOrder(orderId: number, productId: number) {
    const orderItem = await this.db.orderItem.findFirst({
      where: {
        orderId: orderId,
        productId: productId
      }
    })
    console.log(orderItem)
    return this.db.order.update({
      where: { id: orderId },
      data: {
        products: {
          delete: {
            id: orderItem.id
          }
        }
      },
      include: {
        products: true
      }
    })
  }

  remove(id: number) {
    return this.db.order.delete({
      where: { id },

    })
  }
}
