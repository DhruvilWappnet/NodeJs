import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  isNotEmpty,
  isString,
} from 'class-validator';

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export class CreateCatDto {
  @ApiProperty({
    description: 'Name of cat',
    example: 'TheDancer',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Type breed',
    example: 'RussianCat',
  })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({
    description: 'Age of cat',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
  role: UserRole;
}
