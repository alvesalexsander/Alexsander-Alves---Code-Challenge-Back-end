import { SchemaFactory } from "@nestjs/mongoose";
import { Customer } from "./customer.model";

export type CustomerDocument = Customer & Document;

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('firstName').get(function (this: CustomerDocument) {
  return this.name.split(' ')[0];
});

CustomerSchema.virtual('lastName').get(function (this: CustomerDocument) {
  const nameParts = this.name.split(' ')
  return nameParts[nameParts.length - 1];
});