import { Field,  ID, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import {  Entity, ObjectIdColumn, ObjectID, Column, PrimaryColumn, Timestamp  } from 'typeorm';

@ObjectType()
export class Comment {
  
  @Column()
  @Field()
  postId: string;
  @Column()
  @Field()
  comments: string;

  @Column()
  @Field()
  authorId:string;
  
  @Field()
  commentDate: string;

  constructor( postId: string, comments: string, authorId:string,commentDate:string) {
    
    this.postId = postId
    this.comments = comments
    this.authorId = authorId
    this.commentDate= commentDate
}
}
