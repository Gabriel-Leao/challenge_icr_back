import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './user.dto'
import { AuthGuard } from './auth/auth.guard'
import { RoleGuard } from './role/role.guard'
import { Role } from './role/role.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Role('ADMIN')
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getUser(userId)
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data)
  }

  @Put('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() data: CreateUserDto
  ) {
    return await this.userService.updateUser(userId, data)
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(userId)
  }
}
