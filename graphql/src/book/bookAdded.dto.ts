// book.dto.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class BookAdded {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  authorId: number;
}
