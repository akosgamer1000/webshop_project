import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../user/user.service";
import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }
  

  async validate(token: string) {
    const user = await this.userService.getUserByToken(token);
    if (user) {
      return user;
    }
    else {
      throw new UnauthorizedException("Hibás token");
    }
  }
}
