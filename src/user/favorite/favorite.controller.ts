import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { FavoriteService } from './favorite.service'
import { CreateFavoriteDto } from './favorite.dto'
import { AuthGuard } from '../auth/auth.guard'

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard)
  @Get('/:userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoriteService.getUserFavorites(userId)
  }

  @UseGuards(AuthGuard)
  @Post('/:userId')
  async addFavorite(
    @Param('userId') userId: string,
    @Body() data: CreateFavoriteDto
  ) {
    const { bookId } = data
    return await this.favoriteService.addFavorite(userId, bookId)
  }

  @Delete('/:userId')
  async resetFavorites(@Param('userId') userId: string) {
    return await this.favoriteService.resetFavorites(userId)
  }

  @UseGuards(AuthGuard)
  @Delete('/:userId/:favoriteId')
  async removeFavorite(@Param('favoriteId') favoriteId: string) {
    return await this.favoriteService.removeFavorite(favoriteId)
  }
}
