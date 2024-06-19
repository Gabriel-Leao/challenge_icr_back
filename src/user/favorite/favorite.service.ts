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
      throw new HttpException(
        { error: 'Not Found', message: 'Usuário não encontrado' },
        404
      )
    }
    const book = await this.prisma.book.findUnique({ where: { id: bookId } })
    if (!book) {
      throw new HttpException(
        { error: 'Not Found', message: 'Livro não encontrado' },
        404
      )
    }
    const oldFavorite = await this.prisma.favorite.findFirst({
      where: {
        book_id: bookId,
        AND: {
          user_id: userId
        }
      }
    })
    if (oldFavorite) {
      throw new HttpException(
        { error: 'Conflict', message: 'Livro já favoritado' },
        409
      )
    }
    const favorite = await this.prisma.favorite.create({
      data: {
        user_id: userId,
        book_id: bookId
      }
    })
    return {
      message: 'Favorito criado com sucesso',
      success: true,
      status: 200,
      favorite
    }
  }

  async resetFavorites(userId: string) {
    if (userId) {
      await this.prisma.favorite.deleteMany({ where: { user_id: userId } })
    } else {
      throw new HttpException(
        {
          error: 'Bad Request',
          message: 'É necessário enviar o id do usuário'
        },
        400
      )
    }
    return {
      message: 'Favoritos apagados com sucesso',
      success: true,
      status: 200
    }
  }

  async removeFavorite(favoriteId: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        id: favoriteId
      }
    })

    if (!favorite) {
      throw new HttpException(
        { error: 'Not Found', message: 'Favorito não encontrado' },
        404
      )
    }

    await this.prisma.favorite.delete({
      where: {
        id: favoriteId
      }
    })
    return {
      message: 'Favorito deletado com sucesso',
      success: true,
      status: 200
    }
  }
}
