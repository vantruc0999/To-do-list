import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}