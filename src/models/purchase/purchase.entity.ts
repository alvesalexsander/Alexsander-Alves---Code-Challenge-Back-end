import { SchemaFactory } from "@nestjs/mongoose";
import { Purchase } from "./purchase.model";

export type PurchaseDocument = Purchase & Document;

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
