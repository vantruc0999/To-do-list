import { Todo } from 'src/modules/todos/entities/Todo';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
// import { Todo } from 'src/todos/entities/Todo';

@Entity()
export class TodoInfor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Todo, todo => todo.info)
  @JoinColumn({name: 'todoId'})
  todo: Todo;

  @Column()
  todoId: number

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  status: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;
}
