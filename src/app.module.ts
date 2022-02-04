import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [CustomerModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
