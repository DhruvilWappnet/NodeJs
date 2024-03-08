import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './people.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People) private peopleRepository: Repository<People>,
  ) {}

  async findall(): Promise<People[]> {
    return await this.peopleRepository.find();
  }

  async findOne(id: number): Promise<People> {
    return await this.peopleRepository.findOneBy({ id });
  }

  async create(peopledata: Partial<People>): Promise<People> {
    const people = this.peopleRepository.create(peopledata);
    return await this.peopleRepository.save(people);
  }

  async deletePeople(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }

  async userwithphotos(id: number): Promise<People> {
    const photo = await this.peopleRepository.findOne({
      where: { id: id },
      relations: ['photos'],
    });

    if (!photo) {
      throw new NotFoundException('User not found');
    }

    return photo;
  }
}
