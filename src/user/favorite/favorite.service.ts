import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserFavorites(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        user_id: userId
      },
      select: {
        id: true,
        book: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })
  }

  async addFavorite(userId: string, bookId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new HttpException('Usuário não encontrado', 404)
    }
    const book = await this.prisma.book.findUnique({ where: { id: bookId } })
    if (!book) {
      throw new HttpException('Livro não encontrado', 404)
    }
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        book_id: bookId
      }
    })
    if (favorite) {
      throw new HttpException('Livro já favoritado', 400)
    }
    return this.prisma.favorite.create({
      data: {
        user_id: userId,
        book_id: bookId
      }
    })
  }

  async removeFavorite(favoriteId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        id: favoriteId
      }
    })

    if (!favorite) {
      throw new HttpException('Favorito não encontrado', 404)
    }

    return this.prisma.favorite.delete({
      where: {
        id: favoriteId
      }
    })
  }
}
