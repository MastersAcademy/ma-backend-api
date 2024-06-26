import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
  ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';

import { ProductsService } from '@services/products.service';
import { CreateProductDto } from '@dtos/product.dto';
import { UpdateProductDto } from '@dtos/product.dto';
import { FilterProductsDto } from '@dtos/product.dto';
import {JwtAuthGuard} from "@guards/jwt-auth.guard";

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Query() params: FilterProductsDto) {
    return this.productsService.getAll(params);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findById(id);
  }

  // @Post()
  // create(@Body() product: CreateProductDto) {
  //   return this.productsService.create(product);
  // }
  //
  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() changes: UpdateProductDto,
  // ) {
  //   return this.productsService.update(id, changes);
  // }
  //
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.productsService.delete(id);
  // }
  //
  // @ApiExcludeEndpoint()
  // @Post('/raw')
  // getRaw() {
  //   return this.productsService.getRaw();
  // }
}
