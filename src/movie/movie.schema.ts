import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoRef } from 'src/types';
import { User } from 'src/user/user.schema';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  _id: mongoose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  year: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: MongoRef<User>;

  @Prop()
  imageUrl?: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
