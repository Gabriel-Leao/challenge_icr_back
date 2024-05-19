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
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './category.dto'
import { Role } from '../../user/role/role.decorator'
import { AuthGuard } from '../../user/auth/auth.guard'
import { RoleGuard } from '../../user/role/role.guard'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async createCategory(@Body() data: CreateCategoryDto) {
    const categoryName = data.name
    return await this.categoryService.createCategory(categoryName)
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Put('/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.categoryService.updateCategory(categoryId, categoryName)
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory(categoryId)
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
  @Put('/book/:bookId')
  async addCategoryToBook(
    @Param('bookId') bookId: string,
    @Body() data: CreateCategoryDto
  ) {
    const categoryName = data.name
    return await this.categoryService.addCategoryToBook(bookId, categoryName)
  }

  @Role('ADMIN')
  @UseGuards(AuthGuard, RoleGuard)
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
