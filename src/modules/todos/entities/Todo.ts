import { TodoInfor } from 'src/modules/todo_infor/entities/TodoInfor';
import { User } from 'src/modules/users/entities/User';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => TodoInfor, (info) => info.todo, { cascade: true })
  info: TodoInfor;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    nullable: true,
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    nullable: true,
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
