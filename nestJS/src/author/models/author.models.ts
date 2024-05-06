import { Field, Int } from '@nestjs/graphql';

export class Author {
  @Field(Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  // @Field((type) => [Post])
  // posts: Post[];
}
