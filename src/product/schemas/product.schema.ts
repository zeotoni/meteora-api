import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: false,
})
export class Product {
  @Prop()
  image: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: string;

  @Prop()
  category: string;

  @Prop()
  store: string;

  @Prop()
  alt: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
