import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Author } from 'src/entities/author.entity';
import { Book } from 'src/entities/book.entity';
dotenv.config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql', // Change this to 'mysql'
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Book, Author],
  synchronize: true,
};

export default ormconfig;
