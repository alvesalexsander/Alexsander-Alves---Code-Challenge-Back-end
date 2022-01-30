import { DateTime } from 'luxon';
import { Prop, Schema } from "@nestjs/mongoose";
import { EmailRegexValidator } from '../../utils/validations';

@Schema()
export class Customer {

  @Prop({ type: String, required: true, length: 120 })
  name;

  @Prop({ type: String, required: true })
  phoneNumber;

  @Prop({ type: String, required: true, validate: EmailRegexValidator })
  email;

  @Prop({ type: Date, default: DateTime.local().toJSDate(), required: true })
  createdAt;

  @Prop({ type: Date, required: false })
  updatedAt;

}
