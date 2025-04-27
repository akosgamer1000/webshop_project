import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsStrongPassword } from "class-validator"

export class ChangePasswordDto {

    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Password of the user (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)',
        example: 'Asd1234.'
    })
    oldPassword: string

    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Password of the user (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)',
        example: 'Dsa1234.'
    })
    newPassword: string
}