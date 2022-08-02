import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentuser';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()

export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    const user = await this.userService.createUser(data);

    return user;
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  
  async UpdateUser(
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const user = await this.userService.updateUser(data);

    return user;
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() currentUser: User): Promise<User> {
      return currentUser;
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);

    return user;
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await this.userService.findAllUsers();

    return users;
  }
}
