import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { SignInDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const isUserExists = await this.userModel.exists({ email });

    if (isUserExists) {
      const user = await this.userModel.findOne({ email });

      if (user.password === password) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    }

    const user = new this.userModel(dto);
    await user.save();

    return user;
  }

  async find(dto: Partial<SignInDto>) {
    return await this.userModel.find(dto);
  }

  async exists(dto: Partial<Omit<SignInDto, '_id'> & { _id: string }>) {
    return await this.userModel.exists(dto);
  }
}
