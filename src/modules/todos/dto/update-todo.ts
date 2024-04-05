import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateToDoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
