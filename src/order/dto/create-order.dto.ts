import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsString()
    @IsEmail()
    @ApiProperty({example : "barmiAron@example.com"})
    email : string;

    @IsString()
    address : string;

    @IsDefined()
    products: CreateOrderItemDto[];
}

class CreateOrderItemDto {
    @IsDefined()
    @IsNumber()
    productId: number;
    @IsDefined()
    @IsNumber()
    quantity: number;
}
