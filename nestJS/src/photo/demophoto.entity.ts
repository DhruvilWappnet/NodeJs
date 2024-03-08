import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './photo.entity';

@Entity('demophoto')
export class PhotoDemo extends Photo {
  @Column()
  data1ffew: string;

//   @ManyToOne(() => Photo, (photo) => photo.id)
//   @JoinColumn({name:'photo_id'})
//   photo: Photo;
}
