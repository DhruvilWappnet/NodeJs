import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { Author } from '../entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author])],
})
export class DatabaseModule {}
