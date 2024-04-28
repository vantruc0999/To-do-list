import { IsNotEmpty, IsString } from 'class-validator';

export class CreateToDoDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
