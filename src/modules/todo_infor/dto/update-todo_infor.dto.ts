import { IsBoolean, IsDateString, IsNotEmpty} from 'class-validator';

export class UpdateToDoInforDto {
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
