import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    const pipeline = [
      {
        $sample: {
          size: 6,
        },
      },
    ];
    const products = await this.productModel.aggregate(pipeline);

    return products;
  }

  async findByCategory(query: Query): Promise<Product[]> {
    const category = query.category
      ? {
          category: {
            $regex: query.category,
            $options: 'i',
          },
        }
      : {};

    const products = await this.productModel.find({ ...category });

    return products;
  }

  async findByTitle(query: Query): Promise<Product[]> {
    const title = query.title
      ? {
          title: {
            $regex: query.title,
            $options: 'i',
          },
        }
      : {};

    const products = await this.productModel.find({ ...title });

    return products;
  }
}
