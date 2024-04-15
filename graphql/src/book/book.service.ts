// book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { BookDTO } from './book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<BookDTO[]> {
    return await this.bookRepository.find();
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
