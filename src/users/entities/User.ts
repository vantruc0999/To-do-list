import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;
}