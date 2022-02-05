import { Module } from '@nestjs/common';
import { ProductService } from '../../services';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { ProductController } from '../../controllers';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    EntitiesProviders[Provider.PRODUCT_MODEL],
    DBProviders[Provider.MONGODB_CONNECTION]
  ]
})
export class ProductModule {}
