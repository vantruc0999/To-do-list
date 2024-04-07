import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    return this.userService.findAll();
  }

  @Get('/current-user')
  async getCurrentUser(@Request() req) {
    const user = req.user
    return this.userService.getCurrentUser(user)
  }

  @Get('/:id')
  async getUserById(@Param('id') id) {
    return this.userService.findOneUser(id);
  }
}
