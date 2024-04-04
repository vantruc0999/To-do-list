import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/User';
import { UsersModule } from './users/users.module';

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
  }),UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
