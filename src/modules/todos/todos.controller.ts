import { Controller, Post, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateToDoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private todoService: TodosService){

    }

    @Post('/create')
    async create(createTodoDto: CreateToDoDto, @Request() req){
        console.log(req.user.id);
        
        this.todoService.create(createTodoDto);
    }


}
