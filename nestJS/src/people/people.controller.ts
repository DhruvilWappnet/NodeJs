import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './people.entity';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async findall(): Promise<People[]> {
    return await this.peopleService.findall();
  }

  @Get(':id')
  async findOneByid(@Param('id') id: number): Promise<People> {
    return await this.peopleService.findOne(id);
  }

  @Post()
  async postByid(@Body() peopleData: Partial<People>): Promise<People> {
    return this.peopleService.create(peopleData);
  }

  @Delete(':id')
  async deleteByid(@Param('id') id: number,@Res() res:Response): Promise<Response> {
    await this.peopleService.deletePeople(id);
    return res.status(200).send({
        status:true,
        mes:"People is deleted"
    });
  }

  @Get('photo/:id')
  async userWithphoto(@Param('id') id:number):Promise<People>{
    return this.peopleService.userwithphotos(id);
  }

}
