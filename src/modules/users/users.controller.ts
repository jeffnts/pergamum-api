import { Controller, Get, Post, Put, Body, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { Request as RequestType } from 'types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  me(@Request() req: RequestType) {
    return this.usersService.me(req.userId);
  }

  @Put('/status')
  updateStatus(@Body() updateUserStatusDto: UpdateUserStatusDto) {
    const { userId, statusId } = updateUserStatusDto;
    return this.usersService.updateStatus(userId, statusId);
  }
}
