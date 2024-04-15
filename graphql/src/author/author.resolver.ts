// author.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorDTO } from './author.dto';

@Resolver('Author')
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(returns => [AuthorDTO])
  async getAuthors(): Promise<AuthorDTO[]> {
    return await this.authorService.findAll();
  }

  @Mutation(returns => AuthorDTO)
  async createAuthor(@Args('name') name: string): Promise<AuthorDTO> {
    return await this.authorService.create(name);
  }

  @Mutation(returns => Boolean)
  async deleteAuthor(@Args('id') id: number): Promise<boolean> {
    return await this.authorService.delete(id);
  }
}
