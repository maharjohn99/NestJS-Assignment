import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  getMongoManager, Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { CreateCommentInput } from './dto/create-comment.input';
import { Post } from './post.entity';
import { Comment } from './comment';
import { CurrentUser } from 'src/auth/currentuser';
import { User } from 'src/user/user.entity';
@Injectable()
export class PostService {
  
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
   
    
  ) {}

  async createPost(data: CreatePostInput): Promise<Post> {
  
    const post = await this.postRepository.create(data);
  
    await this.postRepository.save(post);

    return post;
  }

  async commentToPost(data: CreateCommentInput): Promise<Post> {
    
    const post = await this.postRepository.findOne(data.postId);
    const date_ob = new Date();

// current date
// adjust 0 before single digit date
const date = ("0" + date_ob.getDate()).slice(-2);

// current month
const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
const year = date_ob.getFullYear();

// current hours
const hours = date_ob.getHours();

// current minutes
const minutes = date_ob.getMinutes();

// current seconds
const seconds = date_ob.getSeconds();
    data.commentDate =year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
   if(post.comment== null){
    let postArray = [];
    postArray.push(data);
    post.comment = postArray;
    postArray = post.comment;
    post.totalComments = postArray.length;
   
    await this.postRepository.save(post);
   }else{
    let postArray = post.comment;
    postArray.push(data);
    post.comment = postArray;
    postArray = post.comment;
    post.totalComments = postArray.length;
   
    await this.postRepository.save(post);
   }
    
    
    // post.comment = [{id:data.id,postId:data.postId,comments:data.comments, authorId: data.authorId}];

    return post;
  }

  async PostWithMaxComment(): Promise<Post[]> {
    
    const posts = await this.postRepository.find({
      order:{totalComments:"DESC"},
      take:1
    });

    return posts;
  }

  async PrivatePosts(id: string):Promise<Post[]>{
      
      const posts = await this.postRepository.find({
        where: {
          userId: {$eq: id},
          type: {$eq:"private"}
          }
      });
    
    return posts;
  }

  async findAllPosts(): Promise<Post[]> {
    //const {ID} = CurrentUser;
    const posts = await this.postRepository.find({
      where: {
        type: {$eq: "public"},
        }
    });

    return posts;
  }

  async findById(id: string): Promise<Post> {
  
    const post = await this.postRepository.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
  async updatePost(data: UpdatePostInput): Promise<Post> {
    const post = await this.findById(data.id);

    await this.postRepository.update(post, { ...data });

    const postUpdated = this.postRepository.create({ ...post, ...data });

    return postUpdated;
  }
  
}
