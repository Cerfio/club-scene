import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDtoInput } from './dto/register.input.dto';
import * as bcrypt from 'bcrypt';
import { LoginDtoInput } from './dto/login.input.dto';
import { SessionsService } from 'src/sessions/sessions.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly usersService: UsersService, private readonly sessionService: SessionsService) { }

  @Post('register')
  async register(@Body() data: RegisterDtoInput) {
    const hash = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      data: {
        email: data.email,
        password: hash,
      },
    });
    const token = crypto.randomUUID();

    await this.sessionService.create({
      data: {
        token,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return {
      message: 'User created successfully',
      data: {
        token,
      },
    }
  }

  @Post('login')
  async login(@Body() data: LoginDtoInput) {
    const user = await this.usersService.get({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException("Invalid credentials");
    }

    const tokenString = crypto.randomUUID();

    return {
      message: 'Login successful',
      data: {
        token: tokenString,
      },
    };
  }
}
