import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from './user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class SignInDto implements User {
  _id: Types.ObjectId;
  @ApiProperty({ type: String })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  password: string;
}
