import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/User';
import { TodosModule } from './modules/todos/todos.module';
import { TodoInforModule } from './modules/todo_infor/todo_infor.module';
import { Todo } from './modules/todos/entities/Todo';
import { TodoInfor } from './modules/todo_infor/entities/TodoInfor';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'todo_list',
    entities: [User, Todo, TodoInfor],
    synchronize: true,
  }),
  AuthModule, TodosModule, TodoInforModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
