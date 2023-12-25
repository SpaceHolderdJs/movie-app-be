import { IsNotEmpty, IsOptional } from 'class-validator';
import { Movie } from './movie.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { MongoRef } from 'src/types';
import { User } from 'src/user/user.schema';

export class MovieDto implements Movie {
  owner: MongoRef<User>;
  _id: Types.ObjectId;
  @ApiProperty({ type: String })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  year: string;

  @ApiProperty({ type: String })
  @IsOptional()
  imageUrl?: string;
}
