import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreatePostInput } from './dto/create-post.input';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { CurrentUser } from 'src/auth/currentuser';
import { User } from 'src/user/user.entity';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('data') data: CreatePostInput): Promise<Post> {
    const post = await this.postService.createPost(data);

    return post;
  }
  @Mutation(()=>Post)
  async createComment(@Args('data') data: CreateCommentInput): Promise<Post> {
    const post = await this.postService.commentToPost(data);
  
    return post;
  }

  @Mutation(() => Post)
  async UpdatePost(
    @Args('data') data: UpdatePostInput,
  ): Promise<Post> {
    const post = await this.postService.updatePost(data);

    return post;
  }

  @Query(() => Post)
  async post(@Args('id') id: string): Promise<Post> {
    const post = await this.postService.findById(id);
       
    return post;
  }

  @Query(() => [Post])
  async PrivatePosts(@Args('id') id: string): Promise<Post[]> {
    const post = await this.postService.PrivatePosts(id);
       
    return post;
  }

  @Query(() => [Post])
  async PostWithMaxComment(): Promise<Post[]> {
    const post = await this.postService.PostWithMaxComment();
       
    return post;
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    const posts = await this.postService.findAllPosts();

    return posts;
  }
}
