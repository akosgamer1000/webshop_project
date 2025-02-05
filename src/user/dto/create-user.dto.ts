import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsIn, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @IsDefined({
        message: "name field must be filled!"
    })
    @IsString()
    @ApiProperty({
        description: 'Name of the user',
        example: 'Bármi Áron'
    })
    name : string;

    @IsDefined({
        message: "email field must be filled!"
    })
    @IsEmail()
    @ApiProperty({
        description: 'Email of the user',
        example: 'barmiAron@example.com'
    })
    email : string;

    @IsDefined({
        message: "password field must be filled!"
    })
    @IsStrongPassword()
    @ApiProperty({
        description: 'Password of the user (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)',
        example: 'Asd1234.'
    })
    password : string;

    @IsDefined({
        message: "role field must be filled!"
    })
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
