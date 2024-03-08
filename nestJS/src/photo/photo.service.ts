import { Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { promises } from 'dns';
import { InjectRepository } from '@nestjs/typeorm';

export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async createPhoto(photoData: Partial<Photo>): Promise<Photo> {
    const photo = await this.photoRepository.create(photoData);
    return this.photoRepository.save(photo);
  }

  async getPhoto(id: number): Promise<Photo> {
    return this.photoRepository.findOneBy({ id });
  }

  async updatePhoto(id: number, photoData: Partial<Photo>): Promise<Photo> {
    await this.photoRepository.update(id, photoData);
    return this.getPhoto(id);
  }

  async deletePhoto(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }

  async photoWithUserInfo(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    return photo;
  }
}
