import { Module } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerController } from '../../controllers/customer/customer.controller';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    EntitiesProviders[Provider.CUSTOMER_MODEL],
    DBProviders[Provider.MONGODB_CONNECTION]
  ]
})
export class CustomerModule {}
