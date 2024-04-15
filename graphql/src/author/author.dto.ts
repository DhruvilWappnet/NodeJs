// author.dto.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorDTO {
  @Field()
  id: number;

  @Field()
  name: string;
}