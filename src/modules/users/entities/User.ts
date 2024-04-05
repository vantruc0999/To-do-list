// User.ts
// import { Todo} from 'src/todos/entities/Todo';
import { Todo } from 'src/modules/todos/entities/Todo';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
  password: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  // @BeforeInsert() hashPassword() {
  //   this.password = bcrypt.hash(this.password, 10);
  //   console.log(this.password);
  // }
}
