import { Field, ID, InputType } from '@nestjs/graphql';
import {  isDate, IsNotEmpty, IsString } from 'class-validator';
import { ObjectID, ObjectIdColumn } from 'typeorm';


@InputType()
export class CreateCommentInput {
 
  @IsString()
  @IsNotEmpty({ message: 'comment is required' })
  comments: string;

  @IsString()
  @IsNotEmpty({ message: 'PostId is required' })
  postId: string;

  @IsString()
  @IsNotEmpty({ message: 'authorId is required' })
  authorId: string;
  @IsNotEmpty({message:'date is required'})
  commentDate:string;
}
