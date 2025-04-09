import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsIn, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Name of the user',
        example: 'Bármi Áron'
    })
    name : string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'Email of the user',
        example: 'barmiAron@example.com'
    })
    email : string;

    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({
        description: 'Password of the user (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)',
        example: 'Asd1234.'
    })
    password : string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Address of the user',
        example: 'sesame street 0'
    })
    address : string;

    @IsNotEmpty()
    @IsString()
    @IsIn(["user", "admin"], {
        message: "role field has to be one of the following: user, admin!"
    })
    @ApiProperty({
        description: 'Role of the user. Can be user/admin',
        example: 'user'
    })
    role : string;

}
