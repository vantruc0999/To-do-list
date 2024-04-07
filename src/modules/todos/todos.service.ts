import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateToDoDto } from './dto/create-todo.dto';
import { Todo } from './entities/Todo';
import { TodoInfor } from '../todo_infor/entities/TodoInfor';
import { User } from '../users/entities/User';
import { UpdateToDoDto } from './dto/update-todo';
import { CreateToDoInforDto } from '../todo_infor/dto/create-todo_infor.dto';
import { UpdateToDoInforDto } from '../todo_infor/dto/update-todo_infor.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(TodoInfor)
    private readonly todoInforRepository: Repository<TodoInfor>,
  ) {}

  async getAllTodos(currentUser) {
    const todos = await this.todoRepository.find({
      where: {
        user: currentUser,
      },
    });
    return todos;
  }

  async create(
    createTodoDto: CreateToDoDto,
    createTodoInforDto: CreateToDoInforDto,
    user: User,
  ): Promise<any> {
    const todo = await this.todoRepository.save({
      ...createTodoDto,
      user,
    });
    const todoInfor = await this.todoInforRepository.save({
      ...createTodoInforDto,
      todo,
    });
    return todoInfor;
  }

  async update(
    todoId: number,
    updateTodo: UpdateToDoDto,
    updateTodoInfor: UpdateToDoInforDto,
    user: User,
  ): Promise<any> {
    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
        user: user,
      },
      relations: ['info'],
    });

    if (!todo) {
      throw new HttpException('Todo not found.', HttpStatus.NOT_FOUND);
    }

    todo.title = updateTodo.title;
    todo.description = updateTodo.description;

    const newUpdateTodo = await this.todoRepository.save(todo);

    const newUpdateTodoInfor = newUpdateTodo.info;

    if (newUpdateTodo.info) {
      newUpdateTodoInfor.dueDate = updateTodoInfor.dueDate;
      newUpdateTodoInfor.status = updateTodoInfor.status;
      await this.todoInforRepository.save(newUpdateTodoInfor);
    }

    return newUpdateTodo;
  }

  async delete(todoId: number, user: User) {
    const todo = await this.todoRepository.findOne({
      where: {
        id: todoId,
        user: user,
      },
      relations: ['info']
    });

    if (!todo) {
      throw new HttpException('Todo not found.', HttpStatus.NOT_FOUND);
    }

    const todoInfor = todo.info

    if(todoInfor){
      await this.todoInforRepository.remove(todoInfor)
    }
    
    await this.todoRepository.remove(todo);
  }
}
