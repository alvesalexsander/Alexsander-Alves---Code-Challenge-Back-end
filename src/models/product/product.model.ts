import { DateTime } from 'luxon';
import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Product {

  @Prop({ type: String, required: true, length: 120 })
  name;

  @Prop({ type: Number, required: true })
  stock;

  @Prop({ type: Number, required: true })
  price;

  @Prop({ type: Date, default: DateTime.local().toJSDate(), required: true })
  createdAt;

  @Prop({ type: Date, required: false })
  updatedAt;

}
