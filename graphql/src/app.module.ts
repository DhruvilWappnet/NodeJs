import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Wappnet@123',
      database: 'test',
      entities: [Book, Author],
      synchronize: true,
    }),
    GraphqlModule,
    DatabaseModule,
    BookModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
