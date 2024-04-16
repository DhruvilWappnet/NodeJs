import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { AuthorModule } from 'src/author/author.module';
import { AuthorResolver } from 'src/author/author.resolver';
import { AuthorService } from 'src/author/author.service';
import { BookModule } from 'src/book/book.module';
import { BookResolver } from 'src/book/book.resolver';
import { BookService } from 'src/book/book.service';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author]),

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // autoSchemaFile: true,
      playground: false, // Enable GraphQL playground
      // installSubscriptionHandlers: true, // Enable subscriptions
      subscriptions: {
        'graphql-ws': true,
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [
    BookResolver,
    BookModule,
    AuthorResolver,
    AuthorModule,
    BookService,
    AuthorService,
  ],
})
export class GraphqlModule {}
