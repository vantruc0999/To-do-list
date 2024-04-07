import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { UpdateToDoDto } from './dto/update-todo';
import { CreateToDoInforDto } from '../todo_infor/dto/create-todo_infor.dto';
import { UpdateToDoInforDto } from '../todo_infor/dto/update-todo_infor.dto';
import { TodoResponseInterceptor } from 'src/interceptors/todo-interceptors';

@Controller('todos')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(TodoResponseInterceptor)
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get('')
  async getAllTodos(@Request() req) {
    const currentUser = req.user;
    return this.todoService.getAllTodos(currentUser);
  }

  @Post('/create')
  async create(
    @Body() createTodoDto: CreateToDoDto,
    @Body() createTodoInforDto: CreateToDoInforDto,
    @Request() req,
  ) {
    const currentUser = req.user;
    return this.todoService.create(
      createTodoDto,
      createTodoInforDto,
      currentUser,
    );
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateToDoDto,
    @Body() updateTodoInforDto: UpdateToDoInforDto,
    @Request() req,
  ): Promise<any> {
    const currentUser = req.user;
    return this.todoService.update(
      Number(id),
      updateTodoDto,
      updateTodoInforDto,
      currentUser,
    );
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number, @Request() req) {
    const currentUser = req.user;
    return this.todoService.delete(id, currentUser);
  }
}
