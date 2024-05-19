import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateBookDto } from './book.dto'

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBooks() {
    return this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        author: true,
        image: true
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
    return this.prisma.book.delete({
      where: { id }
    })
  }

  getAllCategories() {
    return this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        books: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })
  }

  async createCategory(name: string) {
    const category = await this.prisma.category.findUnique({ where: { name } })
    if (category) {
      throw new HttpException('Categoria já cadastrada', 400)
    }
    return this.prisma.category.create({
      data: {
        name
      }
    })
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } })
    if (!category) {
      throw new HttpException('Categoria não encontrada', 404)
    }
    return this.prisma.category.delete({
      where: { id }
    })
  }

  async updateCategory(id: string, name: string) {
    const category = await this.prisma.category.findUnique({ where: { id } })
    if (!category) {
      throw new HttpException('Categoria não encontrada', 404)
    }
    const categoryWithSameName = await this.prisma.category.findUnique({
      where: { name }
    })
    if (categoryWithSameName) {
      throw new HttpException('Já existe uma categoria com esse nome', 400)
    }
    return this.prisma.category.update({
      where: { id },
      data: { name }
    })
  }

  async addCategoryToBook(bookId: string, categoryName: string) {
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
      include: { categories: true }
    })
    if (!book) {
      throw new HttpException('Livro não encontrado', 404)
    }
    const category = await this.prisma.category.findUnique({
      where: { name: categoryName }
    })
    if (!category) {
      throw new HttpException('Categoria não encontrada', 404)
    }
    const existingCategory = book.categories.find((c) => c.id === category.id)
    if (existingCategory) {
      throw new HttpException('Categoria já vinculada ao livro', 400)
    }
    return this.prisma.book.update({
      where: { id: bookId },
      data: {
        categories: {
          connect: { id: category.id }
        }
      }
    })
  }

  async removeCategoryFromBook(bookId: string, categoryName: string) {
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
      include: { categories: true }
    })
    if (!book) {
      throw new HttpException('Livro não encontrado', 404)
    }
    const category = await this.prisma.category.findUnique({
      where: { name: categoryName }
    })
    if (!category) {
      throw new HttpException('Categoria não encontrada', 404)
    }
    const existingCategory = book.categories.find((c) => c.id === category.id)
    if (!existingCategory) {
      throw new HttpException('Categoria não vinculada ao livro', 400)
    }
    return this.prisma.book.update({
      where: { id: bookId },
      data: {
        categories: {
          disconnect: { id: category.id }
        }
      }
    })
  }
}
