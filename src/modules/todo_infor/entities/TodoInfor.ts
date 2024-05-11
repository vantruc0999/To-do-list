import { Todo } from 'src/modules/todos/entities/Todo';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class TodoInfor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Todo, (todo) => todo.info)
  @JoinColumn({ name: 'todo_id' })
  todo: Todo;

  // @Column({ name: 'todo_id' })
  // todoId: number;

  @Column({ nullable: true, name: 'due_date' })
  dueDate: Date;

  @Column({ nullable: true })
  status: boolean;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}
