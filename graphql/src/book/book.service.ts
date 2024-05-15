// book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { BookDTO } from './book.dto';
import { promises } from 'dns';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<BookDTO[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<BookDTO> {
    const book = await this.bookRepository.findOne({
      where: { id: id },
      // relations: {
      //   author: true,
      // },
    });
    return book;
  }

  async findAuthorBook(id: number): Promise<BookDTO[]> {
    const authorBooks = await this.bookRepository.find({
      where: { authorId: id },
    });
    return authorBooks;
  }

  async create(title: string, authorId: number): Promise<BookDTO> {
    const book = new Book();
    book.title = title;
    book.authorId = authorId;
    await this.bookRepository.save(book);
    return book;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return true;
  }
}
