// book.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Resolver('Book')
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query((returns) => [BookDTO])
  async getBooks(): Promise<BookDTO[]> {
    return await this.bookService.findAll();
  }

  @Mutation((returns) => BookDTO)
  async createBook(
    @Args('title') title: string,
    @Args('authorId') authorId: number,
  ): Promise<BookDTO> {
    return await this.bookService.create(title, authorId);
  }

  @Mutation((returns) => Boolean)
  async deleteBook(@Args('id') id: number): Promise<boolean> {
    return await this.bookService.delete(id);
  }
}
