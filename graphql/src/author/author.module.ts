import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from 'src/entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService],
})
export class AuthorModule {}
