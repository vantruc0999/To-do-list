import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TodosModule } from '../todos/todos.module';
import { TodoInforModule } from '../todo_infor/todo_infor.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        username: configService.getOrThrow('MYSQL_ROOT_USER'),
        password: configService.getOrThrow('MYSQL_ROOT_PASSWORD'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
        entities: [AuthModule, TodosModule, TodoInforModule],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
