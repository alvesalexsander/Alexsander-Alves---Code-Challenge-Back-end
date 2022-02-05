import { DateTime } from 'luxon';
import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from 'mongoose';

@Schema()
export class Product {

  @Prop({ type: String, required: true, length: 120 })
  name;

  @Prop({ type: Number, required: true })
  stock;

  @Prop({ type: Number, required: true })
  price;

}

export class PurchasedItem {
  productId: Types.ObjectId;
  productName: string;
  productPrice: number;
  amount: number;
}

export class PurchasedItemBuilder {
  item = new PurchasedItem();

  productId(id: string) {
    this.item.productId = new Types.ObjectId(id);
    return this;
  }

  productName(name: string) {
    this.item.productName = name;
    return this;
  }

  productPrice(price: number) {
    this.item.productPrice = price;
    return this;
  }

  amount(amount: number) {
    this.item.amount = amount;
    return this;
  }

  build() {
    return this.item;
  }
}