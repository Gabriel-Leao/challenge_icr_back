import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto, CreateCategoryDto } from './book.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/category')
  getAllCategories() {
    return this.bookService.getAllCategories()
  }

  @Post('/category')
  async createCategory(@Body() data: CreateCategoryDto) {
    const categoryName = data.name
    return await this.bookService.createCategory(categoryName)
  }

  @Put('/category/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.bookService.updateCategory(categoryId, categoryName)
  }

  @Delete('/category/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.bookService.deleteCategory(categoryId)
  }

  @Put('/:bookId/category')
  async addCategoryToBook(
    @Param('bookId') bookId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.bookService.addCategoryToBook(bookId, categoryName)
  }

  @Delete('/:bookId/category')
  async removeCategoryFromBook(
    @Param('bookId') bookId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.bookService.removeCategoryFromBook(bookId, categoryName)
  }

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks()
  }

  @Get('/:bookId')
  async getOneBook(@Param('bookId') bookId: string) {
    return await this.bookService.getOneBook(bookId)
  }

  @Post()
  createBook(@Body() data: CreateBookDto) {
    return this.bookService.createBook(data)
  }

  @Put('/:bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() data: CreateBookDto
  ) {
    return await this.bookService.updateBook(bookId, data)
  }

  @Delete('/:bookId')
  async deleteBook(@Param('bookId') bookId: string) {
    return await this.bookService.deleteBook(bookId)
  }
}
