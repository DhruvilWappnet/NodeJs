// author.resolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorDTO } from './author.dto';
import { BookDTO } from 'src/book/book.dto';
import { BookService } from 'src/book/book.service';
import { BaseResolver } from 'src/resolver/base.resolver';

@Resolver((of) => AuthorDTO)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
  ) {
    // super(authorService);
  }

  @Query((returns) => [AuthorDTO])
  async getAuthors(): Promise<AuthorDTO[]> {
    return await this.authorService.findAll();
  }

  @Mutation((returns) => AuthorDTO)
  async createAuthor(@Args('name') name: string): Promise<AuthorDTO> {
    return await this.authorService.create(name);
  }

  @Mutation((returns) => Boolean)
  async deleteAuthor(@Args('id') id: number): Promise<boolean> {
    return await this.authorService.delete(id);
  }

  @ResolveField('book', (returns) => [BookDTO])
  async getAuthorBooks(@Parent() author: AuthorDTO): Promise<BookDTO[]> {
    const authorId = author.id;
    const authorBooks = await this.bookService.findAuthorBook(authorId);
    return authorBooks;
  }
}
