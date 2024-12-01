import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { ecrypt } from './helpers/encrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const hashpassword = await ecrypt.haspassword(createAuthDto.password);
    createAuthDto.password = hashpassword;
    const user = await this.userService.create(createAuthDto);
    const token = await this.jwtService.signAsync({ sub: user.id });
    if (!token) {
      throw new UnauthorizedException();
    }

    return { user, token };
  }

  async signin(loginDto: loginDto) {
    const user = await this.userService.findOnebyemail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException({
        message: 'password or email is wrong',
      });
    }
    const isMatch = await ecrypt.decrypt(user.password, loginDto.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'password or email is wrong',
      });
    }
    const token = await this.jwtService.signAsync({ sub: user.id });
    return { user, token };
  }
}
