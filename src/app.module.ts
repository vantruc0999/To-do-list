import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/User';
import { TodosModule } from './modules/todos/todos.module';
import { TodoInforModule } from './modules/todo_infor/todo_infor.module';
import { Todo } from './modules/todos/entities/Todo';
import { TodoInfor } from './modules/todo_infor/entities/TodoInfor';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ ConfigModule.forRoot({
      isGlobal: true
    }),
  AuthModule, TodosModule, TodoInforModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
