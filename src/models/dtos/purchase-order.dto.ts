export class PurchaseOrderDTO {
  buyerId: string;
  items: Array<{
    productId: string;
    amount: number;
    clientSidePrice: number;
  }>;
}

