import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './category.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    const categoryName = data.name
    return await this.categoryService.createCategory(categoryName)
  }

  @Put('/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.categoryService.updateCategory(categoryId, categoryName)
  }

  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory(categoryId)
  }

  @Put('/book/:bookId')
  async addCategoryToBook(
    @Param('bookId') bookId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.categoryService.addCategoryToBook(bookId, categoryName)
  }

  @Delete('/book/:bookId')
  async removeCategoryFromBook(
    @Param('bookId') bookId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.categoryService.removeCategoryFromBook(
      bookId,
      categoryName
    )
  }
}
