import { SchemaFactory } from "@nestjs/mongoose";
import { Product } from "./product.model";

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
