import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './book.dto'

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

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
