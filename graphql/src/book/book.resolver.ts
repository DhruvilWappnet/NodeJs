// book.resolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';
import { AuthorService } from 'src/author/author.service';
import { AuthorDTO } from 'src/author/author.dto';
import { Book } from 'src/entities/book.entity';
import { Author } from 'src/entities/author.entity';
import { createBookArgs } from './create-book.args';
import { BaseResolver } from 'src/resolver/base.resolver';
import { PubSub } from 'graphql-subscriptions';
import { BookAdded } from './bookAdded.dto';

const pubSub = new PubSub();
@Resolver((of) => BookDTO)
export class BookResolver {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
  ) {
    // super(bookService);
  }

  @Query((returns) => [BookDTO])
  async getBooks(): Promise<BookDTO[]> {
    return await this.bookService.findAll();
  }

  @Query((returns) => BookDTO)
  async getBooksByid(@Args('id') id: number): Promise<BookDTO> {
    const book = await this.bookService.findOne(id);
    return book;
  }

  @Mutation((returns) => BookDTO)
  async createBook(@Args() args: createBookArgs): Promise<BookDTO> {
    const { title, authorId } = args;
    const book = await this.bookService.create(title, authorId);
    pubSub.publish('bookAdded', { bookAdded: book });
    return book;
  }

  @Mutation((returns) => Boolean)
  async deleteBook(@Args('id') id: number): Promise<boolean> {
    return await this.bookService.delete(id);
  }

  @ResolveField('author', (returns) => AuthorDTO)
  async getAuthor(@Parent() book: BookDTO): Promise<AuthorDTO> {
    const authorId = book.authorId;
    return this.authorService.findOne(authorId);
  }

  @Subscription(() => BookAdded, {
    name: 'bookAdded',
    resolve: (payload) => payload.bookAdded,
  })
  bookAdded() {
    return pubSub.asyncIterator('bookAdded');
  }
}
