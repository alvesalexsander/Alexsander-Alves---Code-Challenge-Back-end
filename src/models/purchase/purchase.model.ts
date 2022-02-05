import { DateTime } from 'luxon';
import { Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema({
  toJSON: {
    virtuals: true
  }
})
export class Purchase {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, immutable: true })
  buyerId;

  @Prop({ type: Array, required: true })
  items;

  // TODO criar virtual para total do pedido

  @Prop({ type: String, default: '0', required: false })
  status;

  @Prop({ type: Date, default: DateTime.local().toJSDate(), required: false })
  createdAt;

  @Prop({ type: Date, required: false })
  updatedAt;

}
