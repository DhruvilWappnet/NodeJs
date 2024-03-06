import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatService } from './cats.service';
import { Cat } from './cat.schema';

@Controller('ncats')
export class CatsControllers {
  constructor(private readonly catservice: CatService) {}

  @Post()
  async create(@Body() cat: Cat) {
    return this.catservice.create(cat);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catservice.findall();
  }
}
