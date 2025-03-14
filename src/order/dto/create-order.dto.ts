import { IsDefined, IsIn, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsDefined()
    @IsNumber()
    userId : number;
    @IsDefined()
    products : CreateOrderItemDto[];
}

class CreateOrderItemDto {
    @IsDefined()
    @IsNumber()
    productId : number;
    @IsDefined()
    @IsNumber()
    quantity : number;
}
