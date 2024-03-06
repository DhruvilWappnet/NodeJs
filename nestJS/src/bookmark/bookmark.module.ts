import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { logService } from 'src/auth/demo.service';
import { BookmarkService } from './bookmark.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  //   providers: [logService],
  // imports:[logService],
  //   exports:[logService]
  providers: [BookmarkService],
  // imports: [CacheModule.register({ max: 10 })],
})
export class BookmarkModule {
  constructor(private readonly checkEvent: BookmarkService) {
    this.checkEvent.emitEvent('Hello i am dhruvil.');  }
}
