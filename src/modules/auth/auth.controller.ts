import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { Public } from 'src/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @Public()
  @UseGuards(AuthGuard('local'))
  async login(@Body() authUserDto: AuthDto) {
    return this.authService.login(authUserDto);
  }
}
