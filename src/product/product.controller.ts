import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/title')
  async getProductTitle(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.findByTitle(query);
  }

  @Get('/category')
  async getProductByCategory(@Query() query: ExpressQuery): Promise<Product[]> {
    return this.productService.findByCategory(query);
  }
}
