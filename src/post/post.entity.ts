import { Field,  ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { IsArray, isArray } from 'class-validator';
import internal from 'stream';
import {  Entity, ObjectIdColumn, ObjectID, Column  } from 'typeorm';
import { Comment } from './comment';

@ObjectType()
@Entity()
export class Post {
  
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Column()
  postTitle: string;
  @Column()
  postDescription: string;
  @Column()
  type: string;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field(()=>Int,{nullable:true})
  totalComments:number;
  @Column()
  @Field(()=> [Comment],{nullable: true})
  comment:Comment[];

}
