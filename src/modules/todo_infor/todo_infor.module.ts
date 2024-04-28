import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoInfor } from './entities/TodoInfor';

@Module({
  imports: [TypeOrmModule.forFeature([TodoInfor])],
})
export class TodoInforModule {}
