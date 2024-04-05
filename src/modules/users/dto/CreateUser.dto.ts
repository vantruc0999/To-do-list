import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    id: number;
    
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}