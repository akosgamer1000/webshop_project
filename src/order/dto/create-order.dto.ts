import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example : "barmiAron@example.com"})
    email : string;

    @IsString()
    @IsNotEmpty()
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
