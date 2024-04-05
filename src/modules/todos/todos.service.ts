import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, getManager } from 'typeorm';
import { CreateToDoDto } from './dto/create-todo.dto';
import { Todo } from './entities/Todo';
import { TodoInfor } from '../todo_infor/entities/TodoInfor';
import { User } from '../users/entities/User';
import { UpdateToDoDto } from './dto/update-todo';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
        @InjectRepository(TodoInfor)
        private readonly todoInforRepository: Repository<TodoInfor>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly connection: Connection
    ) { }

    // async create(createTodoDto: CreateToDoDto, user: any): Promise<Todo> {
    //     const id = user.id
    //     user = await this.userRepository.findOneBy({id});

    //     const todo = this.todoRepository.create({
    //         ...createTodoDto,
    //         user,
    //     })

    //     // const todoInfor = this.todoInforRepository.create({
    //     //     ...createTodoDto,   
    //     // })

    //     const savedTodo = await this.todoRepository.save(todo);

    //     // await this.todoRepository.save(todoInfor)


    //     return savedTodo;
    // }

    async create(createTodoDto: CreateToDoDto, user: User): Promise<TodoInfor> {
        let createdTodo: Todo;
        let createdTodoInfor: TodoInfor
        await this.connection.transaction(async manager => {
            const userRepository = manager.getRepository(User);
            const todoRepository = manager.getRepository(Todo);
            const todoInforRepository = manager.getRepository(TodoInfor);

            const savedUser = await userRepository.save(user);
            const todo = todoRepository.create({
                ...createTodoDto,
                user: savedUser,
            });
            createdTodo = await todoRepository.save(todo);

            const todoInfor = todoInforRepository.create({
                ...createTodoDto,
                todo: createdTodo,
            });
            createdTodoInfor = await todoInforRepository.save(todoInfor);
        });
        return createdTodoInfor;
    }

    async update(todoId: number, updateTodoDto: UpdateToDoDto): Promise<any> {
        let updatedTodo: Todo;
        let updatedTodoInfor: TodoInfor;

        await this.connection.transaction(async manager => {
            const todoRepository = manager.getRepository(Todo);
            const todoInforRepository = manager.getRepository(TodoInfor);

            // const todoToUpdate = await todoRepository.findOne({ where: { id: todoId } });
            const todoToUpdate = await todoRepository.findOne({ where: { id: todoId }, relations: ['info'] });

            if (!todoToUpdate) {
                throw new Error(`Todo with ID ${todoId} not found`);
            }

            todoToUpdate.title = updateTodoDto.title || todoToUpdate.title;
            todoToUpdate.description = updateTodoDto.description || todoToUpdate.description;
            updatedTodo = await todoRepository.save(todoToUpdate);
            
            let todoInfor = todoToUpdate.info;
            todoInfor.status = updateTodoDto.status || todoInfor.status;
            todoInfor.dueDate = updateTodoDto.dueDate || todoInfor.dueDate;
            updatedTodoInfor = await todoInforRepository.save(todoInfor);
            updatedTodo = todoToUpdate;

            const transformedTodo = {
                ...todoToUpdate,
                ...todoToUpdate.info, // Merge info object with todo object
                info: undefined // Remove the nested info property
            };

            // console.log(transformedTodo);
            

            // todoInfor.dueDate = updateTodoDto.dueDate || todoInfor.dueDate;
            // if (!todoInfor) {
            //     todoInfor = todoInforRepository.create({
            //         // status: updateTodoDto.status || '',
            //         dueDate: updateTodoDto.dueDate || new Date(),
            //         todo: todoToUpdate,
            //     });
            // } else {
            // todoInfor.status = updateTodoDto.status || todoInfor.status;
            // todoInfor.dueDate = updateTodoDto.dueDate || todoInfor.dueDate;
            // // }

            // updatedTodoInfor = await todoInforRepository.save(todoInfor);
            // updatedTodo = todoToUpdate;
            
        });

        return updatedTodo;
    }
}
