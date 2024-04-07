import { IsBoolean, IsDateString, IsNotEmpty} from 'class-validator';

export class CreateToDoInforDto {
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
