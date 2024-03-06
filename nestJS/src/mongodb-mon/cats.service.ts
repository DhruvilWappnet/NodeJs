import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cat.schema';
import { CreateCatDto } from './create-cat.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {
    // this.create;
  }

  async create(cat: CreateCatDto): Promise<Cat> {
    console.log(cat);
    const createdCat = new this.catModel(cat);
    return createdCat.save();
  }

  async findall(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
