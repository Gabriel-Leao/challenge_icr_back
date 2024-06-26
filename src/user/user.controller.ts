import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { AuthGuard } from './auth/auth.guard'
import { RoleGuard } from './role/role.guard'
import { Role } from './role/role.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Role('ADMIN')
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() data: UpdateUserDto
  ) {
    return await this.userService.updateUser(userId, data)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId)
  }
}
