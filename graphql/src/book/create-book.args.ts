import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class createBookArgs {
  @Field()
  title: string;

  @Field()
  authorId: number;
}
