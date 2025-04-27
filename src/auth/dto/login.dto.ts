import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * Data required to login a user
 */

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'barmiAron@example.com'
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Asd1234.'
    })
  password: string;
}
