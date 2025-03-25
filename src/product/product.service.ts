import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductService {
  

    constructor(private readonly db: PrismaService) {}
  

  create(createProductDto: CreateProductDto) {
    return this.db.product.create({
      data: {
        name: createProductDto.name,
        type: createProductDto.type,
        price: createProductDto.price,
        couantity: createProductDto.couantity,
        Processor: createProductDto.Processor ? { create: createProductDto.Processor } : undefined,
        Memory: createProductDto.Memory ? { create: createProductDto.Memory } : undefined,
        HardDrive: createProductDto.HardDrive ? { create: createProductDto.HardDrive } : undefined,
        VideoCard: createProductDto.VideoCard ? { create: createProductDto.VideoCard } : undefined,
        Motherboard: createProductDto.Motherboard ? { create: createProductDto.Motherboard } : undefined,
        CPUCooler: createProductDto.CPUCooler ? { create: createProductDto.CPUCooler } : undefined,
        PowerSupply: createProductDto.PowerSupply ? { create: createProductDto.PowerSupply } : undefined,
        Powerhouse: createProductDto.Powerhouse ? { create: createProductDto.Powerhouse } : undefined,
      },
      include: {
        Processor: true,
        Memory: true,
        HardDrive: true,
        VideoCard: true,
        Motherboard: true,
        CPUCooler: true,
        PowerSupply: true,
        Powerhouse: true,
      },
    });
  }

  async findAll() {
    const products = await this.db.product.findMany({
      include :{
        Processor: true,
        Memory: true,
        HardDrive: true,
        VideoCard: true,
        Motherboard: true,
        CPUCooler: true,
        PowerSupply: true,
        Powerhouse: true
      }
    });
    return products.map(product => {
      return Object.fromEntries(
        Object.entries(product).filter(([key, value]) => value !== null)
      );
    });
  }

  findTypes() {
    return this.db.product.groupBy({
      by: 'type'
    })
  }

  async findOne(id: number) {
    const product = await this.db.product.findUnique({
      where: {
        id: id
      },
      include :{
        Processor: true,
        Memory: true,
        HardDrive: true,
        VideoCard: true,
        Motherboard: true,
        CPUCooler: true,
        PowerSupply: true,
        Powerhouse: true
      }
    });
    return Object.fromEntries(
      Object.entries(product).filter(([key, value]) => value !== null)
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.db.product.update({
      where: { id: id },
      data: {
        name: updateProductDto.name,
        type: updateProductDto.type,
        price: updateProductDto.price,
        couantity: updateProductDto.couantity,
        Processor: updateProductDto.Processor ? { update: updateProductDto.Processor } : undefined,
        Memory: updateProductDto.Memory ? { update: updateProductDto.Memory } : undefined,
        HardDrive: updateProductDto.HardDrive ? { update: updateProductDto.HardDrive } : undefined,
        VideoCard: updateProductDto.VideoCard ? { update: updateProductDto.VideoCard } : undefined,
        Motherboard: updateProductDto.Motherboard ? { update: updateProductDto.Motherboard } : undefined,
        CPUCooler: updateProductDto.CPUCooler ? { update: updateProductDto.CPUCooler } : undefined,
        PowerSupply: updateProductDto.PowerSupply ? { update: updateProductDto.PowerSupply } : undefined,
        Powerhouse: updateProductDto.Powerhouse ? { update: updateProductDto.Powerhouse } : undefined,
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async addProductToCart(userId : number, productId: number) {
      
      if (await this.db.cartItem.count({where: {
        productid: productId,
        userId: userId
      }}) === 0) {
        console.log("Adding new product to cart");
        return await this.db.user.update({
          where: {id: userId},
          data: {
            cart: {
              create: {
                productid: productId,
                quantity: 1
            },
            
          },
        },
        include: {
          cart: {
            select: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true
                }
              },
              quantity: true
            }
        }}
        });
      }
      else {
        const item = await this.db.cartItem.findFirst({where: {
          productid: productId,
          userId: userId
        }});
        return await this.db.user.update({
          where: {id: userId},
          data: {
            cart: {
              update: {
                where: {
                  id: item.id,
                },
                data: {
                  quantity: {
                    increment: 1
                  }
                }
              }
            }
          },
          include: {
            cart: {
              select: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    price: true
                  }
                },
                quantity: true
              }
          }}
        });
      }
    }

    async removeProductFromCart(userId: number, productId: number) {
      const item = await this.db.cartItem.findFirst({where: {
        productid: productId,
        userId: userId
      }});


      if (item.quantity === 1) { {
        console.log("CartItem: ", item.id);
          return await this.db.user.update({
            where: {id: userId},
            data: {
              cart: {
                delete: {
                  id: item.id
                }
              }
            },
            include: {
              cart: {
                select: {
                  product: {
                    select: {
                      id: true,
                      name: true,
                      price: true
                    }
                  },
                  quantity: true
                }
            }}
          });
        }
      } 
      else {
        return await this.db.user.update({
          where: {id: userId},
          data: {
            cart: {
              update: {
                where: {
                  id: item.id,
                },
                data: {
                  quantity: {
                    increment: -1
                  }
                }
              }
            }
          },
          include: {
            cart: {
              select: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    price: true
                  }
                },
                quantity: true
              }
          }}
        });
      }
    }
}
