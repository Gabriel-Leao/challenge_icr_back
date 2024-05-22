import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateBookDto } from './book.dto'

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBooks(userId?: string) {
    return this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        author: true,
        image: true,
        favorite: userId && { where: { user_id: userId } }
      }
    })
  }

  async getOneBook(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        author: true,
        image: true,
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!book) {
      throw new HttpException('Livro não encontrado', 404)
    }
    return book
  }

  createBook(data: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...data
      }
    })
  }

  async updateBook(id: string, data: CreateBookDto) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { categories: true }
    })
    if (!book) {
      throw new HttpException('Livro não encontrado', 404)
    }
    return this.prisma.book.update({
      where: { id },
      data: {
        ...data
      }
    })
  }

  async deleteBook(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id }
    })
    if (!book) {
      throw new HttpException('Livro não encontrado', 404)
    }
    await this.prisma.favorite.deleteMany({
      where: { book_id: id }
    })
    return this.prisma.book.delete({
      where: { id }
    })
  }
}
