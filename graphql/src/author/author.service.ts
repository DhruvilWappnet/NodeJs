// author.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { AuthorDTO } from './author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<AuthorDTO[]> {
    return await this.authorRepository.find();
  }

  async findOne(id): Promise<Author> {
    return await this.authorRepository.findOne({ where: { id: id } });
  }

  async create(name: string): Promise<AuthorDTO> {
    const author = new Author();
    author.name = name;
    await this.authorRepository.save(author);
    return author;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return true;
  }
}
