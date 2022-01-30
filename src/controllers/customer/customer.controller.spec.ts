import { Test, TestingModule } from '@nestjs/testing';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { CustomerService } from '../../services/customer/customer.service';
import { CustomerController } from './customer.controller';

describe('CustomerController', () => {
  let customerController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        DBProviders[Provider.MONGODB_CONNECTION],
        EntitiesProviders[Provider.CUSTOMER_MODEL],
        CustomerService,
      ],
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('features', () => {
    it('should return "Hello World!"', () => {
      expect(false).toBeTruthy();
    });
  });
});
