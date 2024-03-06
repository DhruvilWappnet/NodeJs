import { Inject, Injectable, Scope } from '@nestjs/common';
import { CustomService } from './custome.providers';

// @Injectable({ scope: Scope.REQUEST })
@Injectable()
export class Anotherservice {
  constructor(
    private readonly customeService: CustomService,
    @Inject('CustomValue') private readonly customeValue: string,
  ) {}

  getDataFromCustomService(): string {
    return this.customeService.getData();
    // return "ferf";
  }

  getCustomValue(): string {
    return this.customeValue;
    // return "fwe";
  }
}
