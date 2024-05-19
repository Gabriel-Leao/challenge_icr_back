import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './user.dto'
import { PrismaService } from '../prisma.service'
import { genSaltSync, hashSync } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true
      }
    })
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        name: true,
        email: true,
        role: true,
        password: true,
        favorites: {
          select: {
            id: true,
            book: {
              select: {
                id: true,
                title: true,
                description: true,
                author: true
              }
            }
          }
        }
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404)
    }
    return user
  }

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email
      }
    })
    if (user) {
      throw new HttpException('Email já cadastrado', 400)
    }
    data.password = hashSync(data.password, genSaltSync(10))
    return this.prisma.user.create({
      data: {
        ...data
      }
    })
  }

  async updateUser(id: string, data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404)
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email: data.email, NOT: { id } }
    })

    if (userWithSameEmail) {
      throw new HttpException('Email já cadastrado', 400)
    }

    data.password = hashSync(data.password, genSaltSync(10))
    return this.prisma.user.update({
      where: {
        id
      },
      data
    })
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user) {
      throw new HttpException('Usuário não encontrado', 404)
    }

    return this.prisma.user.delete({
      where: {
        id
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
