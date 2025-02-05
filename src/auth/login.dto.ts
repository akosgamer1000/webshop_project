import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

/**
 * Data required to login a user
 */

export class LoginDto {
  @IsString()
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
