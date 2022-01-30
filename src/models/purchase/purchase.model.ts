import { DateTime } from 'luxon';
import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from 'mongoose';

class PurchasedItem {
  productId: Types.ObjectId;
  productName: string;
  productPrice: number;
  amount: number;
}

@Schema()
export class Purchase {

  @Prop({ type: Types.ObjectId, required: true, immutable: true })
  buyerId;

  // @Prop({ type: Types.Array, required: true })
  // items;

  @Prop({ type: Number, required: true })
  total;

  @Prop({ type: Number, required: true })
  status;

  @Prop({ type: Date, default: DateTime.local().toJSDate(), required: true })
  createdAt;

  @Prop({ type: Date, required: false })
  updatedAt;

}

