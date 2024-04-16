// author.dto.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BookDTO } from 'src/book/book.dto';

@ObjectType()
export class AuthorDTO {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [BookDTO], { nullable: true })
  book?: BookDTO[];
}
