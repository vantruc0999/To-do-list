import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/Todo';
import { Repository } from 'typeorm';
import { CreateToDoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private userRepository: Repository<Todo>) { }

    async create(createTodoDto: CreateToDoDto){
        
    }
}
