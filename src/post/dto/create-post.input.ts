import { InputType } from '@nestjs/graphql';
import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsString()
  @IsNotEmpty({ message: 'PostTitle is required' })
  postTitle: string;

  @IsString()
  @IsNotEmpty({ message: 'PostDescription is required' })
  postDescription: string;

  @IsString()
  @IsNotEmpty({ message: 'Type is required' })
  type: string;
  
  @IsString()
  @IsNotEmpty({message:'userId is required'})
  userId:string;
  
}
