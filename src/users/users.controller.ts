import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {

    }

    @Get()
    async getUsers() {
        return this.userService.findAll()
    }
}
