import { SchemaFactory } from "@nestjs/mongoose";
import { Customer } from "./customer.model";

export type CustomerDocument = Customer & Document;

export const CustomerSchema = SchemaFactory.createForClass(Customer);
