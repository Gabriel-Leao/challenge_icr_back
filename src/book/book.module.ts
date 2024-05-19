import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { PrismaService } from '../prisma.service'
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';

@Module({
  controllers: [BookController, CategoryController],
  providers: [BookService, PrismaService, CategoryService]
})
export class BookModule {}
