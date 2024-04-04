import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../todos/entities/Todo';
// import { Todo } from 'src/todos/entities/Todo';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
})
export class TodoInforModule {}
