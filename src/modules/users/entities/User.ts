// User.ts
// import { Todo} from 'src/todos/entities/Todo';
import { Todo } from 'src/modules/todos/entities/Todo';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;
  
  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];

  @Column({ nullable: true })
  fullName: string;

  @Column()
  email: string;

  @Column()
  @Exclude() 
  password: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
