import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { FavoriteService } from './favorite.service'
import { CreateFavoriteDto } from './favorite.dto'

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('/:userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoriteService.getUserFavorites(userId)
  }

  @Post('/:userId')
  async addFavorite(
    @Param('userId') userId: string,
    @Body() data: CreateFavoriteDto
  ) {
    const { bookId } = data
    return await this.favoriteService.addFavorite(userId, bookId)
  }

  @Delete('/:userId/:favoriteId')
  async removeFavorite(@Param('favoriteId') favoriteId: string) {
    return await this.favoriteService.removeFavorite(favoriteId)
  }
}
