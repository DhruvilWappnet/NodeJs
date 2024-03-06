import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { number } from 'zod';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;
  @Prop(number)
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// export const CatSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     breed: String,
//   });
