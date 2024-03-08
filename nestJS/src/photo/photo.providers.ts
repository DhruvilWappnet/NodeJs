import { DataSource } from "typeorm";
import { Photo } from "./photo.entity";
import { PhotoDemo } from "./demophoto.entity";

export const photoProviders = [
  {
    provide: 'PHOTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>{ dataSource.getRepository(Photo),dataSource.getRepository(PhotoDemo)},
    inject: ['DATA_SOURCE'],
  },
];
