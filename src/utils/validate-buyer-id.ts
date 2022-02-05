import { HttpException, HttpStatus } from "@nestjs/common";
import { Types } from "mongoose";
import { getMessage } from ".";

export function validateBuyerId(buyerId: string): Promise<any> {
  return this.customerModel.findOne({ _id: new Types.ObjectId(buyerId) })
    .catch(() => { throw new HttpException(getMessage('CREATE_PURCHASE_FAIL_CLIENT_NOT_FOUND', buyerId), HttpStatus.NOT_FOUND) });
}