import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/User';
import { TodosModule } from './todos/todos.module';
import { TodoInforModule } from './todo_infor/todo_infor.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'todo_list',
    entities: [User],
    synchronize: true,
  }),AuthModule, TodosModule, TodoInforModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
