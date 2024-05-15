import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoDemo } from './demophoto.entity';
import { User } from 'src/user/user.interface';
import { People } from 'src/people/people.entity';

@Entity('photos')
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ManyToOne(() => People, (people) => people.photos)
  user: People;

  // @OneToMany(()=>PhotoDemo,
  // photodemo=>photodemo.photo)
  // photos:PhotoDemo[]
}
