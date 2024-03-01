import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CatsModule } from './cats/cats.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [ UserModule, BookmarkModule, CatsModule],
  providers:[{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },]
  
})
export class AppModule {}
