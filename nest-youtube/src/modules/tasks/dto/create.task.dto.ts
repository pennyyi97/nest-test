import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsString()
  username: string;
}
