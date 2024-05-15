// book.dto.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { AuthorDTO } from '../author/author.dto';

@ObjectType()
export class BookDTO {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  authorId: number;

  @Field(() => AuthorDTO, { nullable: true })
  author?: AuthorDTO;
}
