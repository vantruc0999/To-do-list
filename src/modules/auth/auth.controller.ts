import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/CreateUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() authUserDto: AuthDto) {
        return this.authService.login(authUserDto);
    }
}