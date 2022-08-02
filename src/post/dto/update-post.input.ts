import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'PostTitle is required' })
  @IsOptional()
  postTitle: string;

  @IsString()
  @IsNotEmpty({ message: 'PostDescription is required' })
  @IsOptional()
  postDescription: string;

  @IsString()
  @IsNotEmpty({ message: 'type is required' })
  @IsOptional()
  type: string;
}
