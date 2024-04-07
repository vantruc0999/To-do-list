import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { TodoInforModule } from './modules/todo_infor/todo_infor.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
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
    UsersModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'users/current-user',
        method: RequestMethod.GET,
      },
      {
        path: 'todos',
        method: RequestMethod.GET,
      },
      {
        path: 'todos/create',
        method: RequestMethod.POST,
      },
      {
        path: 'todos/update/:id',
        method: RequestMethod.PUT,
      },
      {
        path: 'todos/delete/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
