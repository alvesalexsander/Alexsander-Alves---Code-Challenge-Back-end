import { Connection } from "mongoose";
import { ProductSchema, CustomerSchema, PurchaseSchema } from "../models/";
import { Provider } from "./provider.enum";

export const EntitiesProviders = {
  [Provider.CUSTOMER_MODEL]: {
    provide: Provider.CUSTOMER_MODEL,
    useFactory: (connetion: Connection) => connetion.model('Customer', CustomerSchema),
    inject: [Provider.MONGODB_CONNECTION]
  },
  [Provider.PRODUCT_MODEL]: {
    provide: Provider.PRODUCT_MODEL,
    useFactory: (connetion: Connection) => connetion.model('Product', ProductSchema),
    inject: [Provider.MONGODB_CONNECTION]
  },
  [Provider.PURCHASE_MODEL]: {
    provide: Provider.PURCHASE_MODEL,
    useFactory: (connetion: Connection) => connetion.model('Purchase', PurchaseSchema),
    inject: [Provider.MONGODB_CONNECTION]
  }
};
