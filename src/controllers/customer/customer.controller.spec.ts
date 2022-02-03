import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '../../models';
import { CustomerService } from '../../services/customer/customer.service';
import { DBProviders, EntitiesProviders, ServicesProviders, Provider } from '../../providers';
import { CustomerController } from './customer.controller';
import { Types } from 'mongoose';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        ServicesProviders[Provider.CUSTOMER_SERVICE],
        CustomerService,
        EntitiesProviders[Provider.CUSTOMER_MODEL],
        ...Object.values(DBProviders)
      ]
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
    customerService = app.get<CustomerService>(CustomerService);
  });

  describe('features', () => {
    it('should return "pong"', () => {
      expect(customerController.ping()).toBe('pong');
    });

    it('should return a customer', async () => {
      const customerData = new Customer();
      customerData.name = 'Assim Lin';
      customerData.phoneNumber = '00000000000';
      customerData.email = 'assim@lin.com';

      const createdCustomer = await customerService.createCustomer(customerData);
      const customer = await customerController.getCustomerById(createdCustomer._id.toString());
      expect(customer).toBeInstanceOf(Customer);
      customerService.deleteCustomer(customer._id);
    });

  });
});
