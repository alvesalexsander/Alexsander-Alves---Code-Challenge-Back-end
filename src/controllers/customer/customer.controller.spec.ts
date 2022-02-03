import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '../../models';
import { CustomerService } from '../../services/customer/customer.service';
import { DBProviders, EntitiesProviders, ServicesProviders, Provider } from '../../providers';
import { CustomerController } from './customer.controller';
import { Types } from 'mongoose';
import { custom } from 'joi';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  const validCustomerBody = {
    name: 'Assim Lin',
    email: 'assim@lin.com',
    phoneNumber: '22999999002',
  };

  const invalidCustomerBody = {
    ...validCustomerBody,
    email: 'assimlin.com', // invalid email
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        EntitiesProviders[Provider.CUSTOMER_MODEL],
        ...Object.values(DBProviders),
        CustomerService
      ]
    }).compile();

    customerController = app.get<CustomerController>(CustomerController);
  });

  describe('features', () => {
    it('should return "pong"', () => {
      expect(customerController.ping()).toBe('pong');
    });

    it('should return a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as any);
      const customer = await customerController.getCustomerById(createdCustomer._id.toString());
      expect(customer).toBeTruthy();
      await customerController.deleteCustomer(customer._id);
    });

    it('should create a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      expect(createdCustomer).toBeTruthy();
      await customerController.deleteCustomer(createdCustomer._id);
    });

    it('should not create a customer', async () => {
      await customerController.createCustomer(invalidCustomerBody as Customer).then(() => {
        expect(false).toBeTruthy();
      }).catch((err) => {
        expect(Object.keys(err.errors)).toContain('email');
      });
    });

    it('should update a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      await customerController.updateCustomer(createdCustomer._id.toString(), { name: 'Assim Lan' });
      const updatedCustomer = await customerController.getCustomerById(createdCustomer._id.toString());
      expect(updatedCustomer.name).toBe('Assim Lan');
      await customerController.deleteCustomer(createdCustomer._id);
    });

    it('should delete a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      await customerController.deleteCustomer(createdCustomer._id).then((res) => {
        console.log(res);
        expect(true).toBeTruthy();
      });
    });

  });
});
