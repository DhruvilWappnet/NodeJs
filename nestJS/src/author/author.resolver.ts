import { Resolver } from '@nestjs/graphql';
import { Author } from './models/author.models';
import { AuthorService } from './author.service';
import { PostService } from 'src/post/post.service';

@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(
    private authorsService: AuthorService,
    private postsService: PostService,
  ) {}
}
