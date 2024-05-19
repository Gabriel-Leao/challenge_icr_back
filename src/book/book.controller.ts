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

  @Get('/:id')
  async getOneBook(@Param('id') id: string) {
    return await this.bookService.getOneBook(id)
  }

  @Post()
  createBook(@Body() data: CreateBookDto) {
    return this.bookService.createBook(data)
  }

  @Put('/:id')
  async updateBook(@Param('id') id: string, @Body() data: CreateBookDto) {
    return await this.bookService.updateBook(id, data)
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string) {
    return await this.bookService.deleteBook(id)
  }
}
