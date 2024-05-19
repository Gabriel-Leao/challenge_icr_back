import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id)
  }

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data)
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() data: CreateUserDto) {
    return await this.userService.updateUser(id, data)
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id)
  }
}
