import {
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiTags } from '@nestjs/swagger';
import { Photo } from './photo.entity';

@Controller('photo')
@ApiTags('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Post()
  async create(@Body() photoData: Partial<Photo>): Promise<Photo> {
    return this.photoService.createPhoto(photoData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Photo> {
    return this.photoService.getPhoto(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() photoData: Partial<Photo>,
  ): Promise<Photo> {
    return this.photoService.updatePhoto(+id, photoData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.photoService.deletePhoto(+id);
  }

  @Get('user/:id')
  async findOneWithUser(@Param('id') id: string): Promise<Photo> {
    return this.photoService.photoWithUserInfo(+id);
  }
}
