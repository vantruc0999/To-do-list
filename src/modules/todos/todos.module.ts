import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/Todo';
import { TodoInfor } from '../todo_infor/entities/TodoInfor';
import { User } from '../users/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoInfor, User])],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
