import { Module } from '@nestjs/common';
import { DatabaseSqlModule } from 'src/database-sql/database-sql.module';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';

@Module({
  // DatabaseSqlModule
  imports: [TypeOrmModule.forFeature([Photo])],
  // ...photoProviders,
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
