import { HttpException, HttpStatus } from "@nestjs/common";
import { Types } from "mongoose";
import { getMessage } from "..";

export function validatePurchaseItems(items: Array<{ productId: string; amount: number; clientSidePrice: number; }>): Promise<any> {
  if (!items?.length) {
    throw new HttpException(getMessage('CREATE_PURCHASE_FAIL_NO_ITEMS'), HttpStatus.BAD_REQUEST);
  }

  const itemsPromises = [];
  for (const item of items) {
    if (!item?.amount || !item?.clientSidePrice || !item?.productId) {
      throw new HttpException(getMessage('CREATE_PURCHASE_FAIL_MALFORMED_ITEM', item), HttpStatus.BAD_REQUEST);
    }
    itemsPromises.push(this.productModel.findOne({ _id: new Types.ObjectId(item.productId) })
      .then(product => {
        if (!product) {
          throw new HttpException(getMessage('CREATE_PURCHASE_FAIL_PRODUCT_NOT_FOUND', item.productId), HttpStatus.BAD_REQUEST);
        }
        if (product.stock < item.amount) {
          throw new HttpException(getMessage('CREATE_PURCHASE_FAIL_PRODUCT_OUT_OF_STOCK', {
            productId: product._id,
            amount: item.amount
          }), HttpStatus.BAD_REQUEST);
        }
        if (product.price !== item.clientSidePrice) {
          throw new HttpException(
            getMessage('CREATE_PURCHASE_FAIL_PRODUCT_PRICE_OUTBOUND', {
              productId: item.productId,
              clientSidePrice: item.clientSidePrice,
              price: product.price
            }), HttpStatus.BAD_REQUEST);
        }
        return product;
      }));
  }
  return Promise.all(itemsPromises);
}