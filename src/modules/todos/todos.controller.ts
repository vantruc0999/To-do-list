import { Body, Controller, Param, Post, Put, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateToDoDto } from './dto/create-todo.dto';
import { TodoInfor } from '../todo_infor/entities/TodoInfor';
import { UpdateToDoDto } from './dto/update-todo';

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService) {

    }

    @Post('/create')
    async create(@Body() createTodoDto: CreateToDoDto, @Request() req) {
        const user = req.user
        return this.todoService.create(createTodoDto, user);
    }

    @Put('/update/:id')
    async update(@Param('id') id: string, @Body() updateTodoDto: UpdateToDoDto,  @Request() req): Promise<any> {
        // console.log(req);
        return this.todoService.update(Number(id), updateTodoDto);
    }
}
