import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Post,
  Delete, UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from '@services/categories.service';
import { ProductsService } from '@services/products.service';
import { FilterProductsDto } from '@dtos/product.dto';
import { UpdateCategoryDto } from '@dtos/category.dto';
import { CreateCategoryDto } from '@dtos/category.dto';
import { FilterCategoriesDto } from '@dtos/category.dto';
import {JwtAuthGuard} from "@guards/jwt-auth.guard";

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() params: FilterCategoriesDto) {
    return this.categoriesService.getAll(params);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findById(id);
  }

  // @Post()
  // create(@Body() category: CreateCategoryDto) {
  //   return this.categoriesService.create(category);
  // }

  // @UseGuards(JwtAuthGuard)
  @Get(':id/products')
  getProductsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: FilterProductsDto,
  ) {
    return this.productsService.byCategory(id, params);
  }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() changes: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(id, changes);
  // }
  //
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.categoriesService.delete(id);
  // }
}
