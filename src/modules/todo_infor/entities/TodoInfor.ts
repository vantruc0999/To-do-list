import { Todo } from 'src/modules/todos/entities/Todo';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne} from 'typeorm';
// import { Todo } from 'src/todos/entities/Todo';

@Entity()
export class TodoInfor {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Todo, todo => todo.info)
  todo: Todo;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  due_date: Date;

  @Column({ nullable: true })
  status: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;
}
