import { Controller, Get } from '@nestjs/common';
import { Anotherservice } from './cats.service';

@Controller('cats')
export class catscontroller {
    constructor(private readonly anotherService:Anotherservice){}

    @Get('first')
    getservice(){
        return this.anotherService.getDataFromCustomService();
        // return "ferf";
    }

    @Get('second')
    getvalue(){
        return this.anotherService.getCustomValue();
        // return "wefw";
    }

}
