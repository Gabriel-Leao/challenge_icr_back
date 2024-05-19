import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common'
import { BookService } from './book.service'
import { CreateBookDto } from './book.dto'
import { AuthGuard } from '../user/auth/auth.guard'
import { Role } from '../user/role/role.decorator'
import { RoleGuard } from '../user/role/role.guard'

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

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  createBook(@Body() data: CreateBookDto) {
    return this.bookService.createBook(data)
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Put('/:bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() data: CreateBookDto
  ) {
    return await this.bookService.updateBook(bookId, data)
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/:bookId')
  async deleteBook(@Param('bookId') bookId: string) {
    return await this.bookService.deleteBook(bookId)
  }
}
