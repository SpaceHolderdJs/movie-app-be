import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignInDto } from './dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-in')
  async singIn(@Body() body: SignInDto) {
    return await this.userService.signIn(body);
  }
}
