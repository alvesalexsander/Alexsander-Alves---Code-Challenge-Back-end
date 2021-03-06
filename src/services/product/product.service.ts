import { Inject, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Product, ProductDocument } from "../../models";

@Injectable()
export class ProductService {

  constructor(@Inject('PRODUCT_MODEL') private productModel) { }

  async getProducts(filter: any, projection: any): Promise<ProductDocument[]> {
    return this.productModel.find(filter, projection);
  }

  async getProductsAndCount(filter: any, projection: any, options: any): Promise<any> {
    const results = await Promise.all([
      this.productModel.find(filter, projection, options),
      this.productModel.countDocuments(filter)
    ]);
    return {
      data: results[0],
      count: results[1]
    }
  }

  async getProduct(filter: any): Promise<ProductDocument> {
    return this.productModel.findOne(filter);
  }

  async createProduct(product: Product): Promise<any> {
    return this.productModel.create(product);
  }

  async updateProduct(productId: string, updateData: Partial<Product>): Promise<any> {
    return this.productModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(productId)
      },
      {
        updatedAt: new Date(),
        ...updateData,
      },
      {
        new: true
      });
  }

  async deleteProduct(productId: string): Promise<any> {
    return this.productModel.deleteOne({ _id: new Types.ObjectId(productId) });
  }
}