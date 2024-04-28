import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { TodoInforModule } from './modules/todo_infor/todo_infor.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TodosModule,
    TodoInforModule,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
