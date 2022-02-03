import { Module } from '@nestjs/common';
import { CustomerController } from '../../controllers/customer/customer.controller';
import { DBProviders, ServicesProviders, EntitiesProviders, Provider } from '../../providers';

@Module({
  controllers: [CustomerController],
  providers: [
    ServicesProviders[Provider.CUSTOMER_SERVICE],
    EntitiesProviders[Provider.CUSTOMER_MODEL],
    ...Object.values(DBProviders)
  ]
})
export class CustomerModule {}
