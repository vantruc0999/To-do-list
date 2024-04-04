import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}