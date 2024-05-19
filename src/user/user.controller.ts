import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateFavoriteDto, CreateUserDto } from './user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
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

  @Post('/:userId/favorites')
  async addFavorite(
    @Param('userId') userId: string,
    @Body() data: CreateFavoriteDto
  ) {
    const { bookId } = data
    return await this.userService.addFavorite(userId, bookId)
  }

  @Delete('/:userId/favorites/:favoriteId')
  async removeFavorite(@Param('favoriteId') favoriteId: string) {
    return await this.userService.removeFavorite(favoriteId)
  }
}
