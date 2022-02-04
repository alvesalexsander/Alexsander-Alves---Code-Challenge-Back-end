import { Inject, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Purchase, PurchaseDocument } from "../../models";

@Injectable()
export class PurchaseService {

  constructor(@Inject('PURCHASE_MODEL') private purchaseModel) { }

  async getPurchases(filter: any, projection: any): Promise<PurchaseDocument[]> {
    return this.purchaseModel.find(filter, projection);
  }

  async getPurchase(filter: any): Promise<PurchaseDocument> {
    return this.purchaseModel.findOne(filter);
  }

  async createPurchase(purchase: Purchase): Promise<any> {
    return this.purchaseModel.create(purchase);
  }

  async updatePurchase(purchaseId: string, updateData: Partial<Purchase>): Promise<any> {
    return this.purchaseModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(purchaseId)
      },
      {
        ...updateData,
        updatedAt: new Date(),
      },
      {
        new: true
      });
  }

  async deletePurchase(purchaseId: string): Promise<any> {
    return this.purchaseModel.deleteOne({ _id: new Types.ObjectId(purchaseId) });
  }
}