import { Module } from '@nestjs/common';
import { PurchaseService } from '../../services';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { PurchaseController } from '../../controllers';

@Module({
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    EntitiesProviders[Provider.PURCHASE_MODEL],
    EntitiesProviders[Provider.CUSTOMER_MODEL],
    EntitiesProviders[Provider.PRODUCT_MODEL],
    DBProviders[Provider.MONGODB_CONNECTION]
  ]
})
export class PurchaseModule {}
