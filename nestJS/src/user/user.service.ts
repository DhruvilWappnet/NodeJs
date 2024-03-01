import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.interface';
import { error } from 'console';
import { NotFoundExceptionByuser } from './forbidden.exception';

@Injectable()
export class userService {
  private name: string;
  private users: User[] = [];
  // constructor(@Inject(AuthService) authservice: AuthService, name: string) {
  //   this.name = name;
  // }

  findall(): User[] {
    return this.users;
  }

  finduser(id: number): User {
    let ans = undefined;
    for (let index = 0; index < this.users.length; index++) {
      if (this.users[index].id == id) {
        // console.log(this.users[index]);
        return this.users[index];
      }
    }
    // console.log(ans);
    return ans;
  }

  create(user: User): User {
    const newuser = { id: this.users.length + 1, ...user };
    this.users.push(newuser);
    return newuser;
  }

  update(id: number, user: User): User {
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = { id, ...user };
      return this.users[index];
    }
    return null;
  }

  delete(id: number): User[] {
    this.users = this.users.filter((user) => user.id !== id);
    // throw new Error("rwej");
    // throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    // throw new ForbiddenException();
    // throw new BadRequestException('SOmething happen', {
    //   cause: new Error(),
    //   description: 'Hello this is new error',
    // });
    return this.users;
  }
}
