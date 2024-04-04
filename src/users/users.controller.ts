import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){

    }

    @Get()
    async getUsers(){
       return this.userService.findAll()
    }

    @Post()
    createUser(@Body() CreateUserDto: CreateUserDto){
        this.userService.createUser();
    }
}
