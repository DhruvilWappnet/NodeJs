import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { AuthorModule } from 'src/author/author.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, AuthorModule],
})
export class BookModule {}
