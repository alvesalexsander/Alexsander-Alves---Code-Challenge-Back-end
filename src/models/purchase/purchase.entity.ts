import { SchemaFactory } from "@nestjs/mongoose";
import { Purchase } from "./purchase.model";

export type PurchaseDocument = Purchase & Document;

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);

PurchaseSchema.virtual('total').get(function (this: PurchaseDocument) {
  return this.items.reduce((sum, i) => {
    return sum + (i.productPrice * i.amount);
  }, 0);
});