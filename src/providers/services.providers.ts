import { CustomerService } from "../services/customer/customer.service";
import { Provider } from "./provider.enum";

export const ServicesProviders = {
  [Provider.CUSTOMER_SERVICE]: {
    provide: Provider.CUSTOMER_SERVICE,
    useFactory: () => CustomerService,
    inject: [Provider.CUSTOMER_MODEL]
  },
};
