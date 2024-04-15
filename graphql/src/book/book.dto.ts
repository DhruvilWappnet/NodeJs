// book.dto.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookDTO {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  authorId: number;
}
