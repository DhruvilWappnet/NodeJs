import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [ UserModule, BookmarkModule, CatsModule],
  
})
export class AppModule {}
