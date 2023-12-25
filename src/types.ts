import { ObjectId } from 'mongoose';

export type MongoRef<T> = T | ObjectId | string;

export interface RequestWithFile extends Request {
  files?: any[];
  file: any;
}
