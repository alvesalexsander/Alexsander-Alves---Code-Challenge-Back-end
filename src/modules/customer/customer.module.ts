import { Module } from '@nestjs/common';
import { CustomerService } from 'src/services/customer/customer.service';
import { CustomerController } from '../../controllers/customer/customer.controller';
import { DBProviders, ServicesProviders, EntitiesProviders, Provider } from '../../providers';

@Module({
  controllers: [CustomerController],
  providers: [
    ServicesProviders[Provider.CUSTOMER_SERVICE],
    CustomerService,
    EntitiesProviders[Provider.CUSTOMER_MODEL],
    ...Object.values(DBProviders)
  ]
})
export class CustomerModule {}
