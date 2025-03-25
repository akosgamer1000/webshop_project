import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsStrongPassword } from "class-validator"

export class ChangePasswordDto {

    @IsDefined({
        message: "oldPassword field must be filled!"
    })
    @IsStrongPassword()
    @ApiProperty({
        description: 'Password of the user (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)',
        example: 'Asd1234.'
    })
    oldPassword: string

    @IsDefined({
        message: "mewPassword field must be filled!"
    })
    @IsStrongPassword()
    @ApiProperty({
        description: 'Password of the user (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)',
        example: 'Dsa1234.'
    })
    newPassword: string
}