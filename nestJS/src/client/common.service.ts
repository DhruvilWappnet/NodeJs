import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { clientService } from './client.service';

@Injectable()
export class commanService {
  constructor(@Inject(forwardRef(()=>clientService)) private clientservice: clientService) {}
}
