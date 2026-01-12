import { IsString } from 'class-validator';

export class updatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  author: string;

  @IsString()
  major: string;
}
