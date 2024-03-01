import { Module } from '@nestjs/common';
import { logService } from 'src/auth/demo.service';

@Module({
  //   providers: [logService],
    // imports:[logService],
  //   exports:[logService]
})
export class BookmarkModule {}
