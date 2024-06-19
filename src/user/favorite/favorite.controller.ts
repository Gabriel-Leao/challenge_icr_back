import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  @Get('/:userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoriteService.getUserFavorites(userId)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/:userId')
  async addFavorite(
    @Param('userId') userId: string,
    @Body() data: CreateFavoriteDto
  ) {
    const { bookId } = data
    return await this.favoriteService.addFavorite(userId, bookId)
  }

  @UseGuards(AuthGuard)
  @Delete('/:userId')
  @HttpCode(HttpStatus.OK)
  async resetFavorites(@Param('userId') userId: string) {
    return await this.favoriteService.resetFavorites(userId)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/:userId/:favoriteId')
  async removeFavorite(@Param('favoriteId') favoriteId: string) {
    return await this.favoriteService.removeFavorite(favoriteId)
  }
}
