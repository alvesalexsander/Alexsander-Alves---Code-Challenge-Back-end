import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '../../models';
import { CustomerService } from '../../services/customer/customer.service';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { CustomerController } from './customer.controller';
import { getMessage } from '../../utils/messages/get-message';

describe('CustomerController', () => {
  let customerController: CustomerController;
  const toClean = [];

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

  afterAll(async () => {
    await Promise.all(toClean);
  })

  describe('features', () => {

    it('should return a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      const customer = await customerController.getCustomerById(createdCustomer._id.toString());
      toClean.push(customerController.deleteCustomer(customer._id));
    
      expect(customer).toBeTruthy();
    });

    it('should create a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      toClean.push(customerController.deleteCustomer(createdCustomer._id));
      expect(createdCustomer).toBeTruthy();
    });

    it('should not create a customer with invalid data', async () => {
      await customerController.createCustomer(invalidCustomerBody as Customer).then(() => {
        // se o cliente for criado com sucesso, dispara um erro intencional.
        throw new Error('should not create a customer :: failed :: customer created with invalid email');
      }).catch((err) => {
        expect(Object.keys(err.errors)).toContain('email');
      });
    });

    it('should update a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      const response = await customerController.updateCustomer(createdCustomer._id, { name: 'Assim Lan' });
      const updatedCustomer = await customerController.getCustomerById(createdCustomer._id.toString());
      toClean.push(customerController.deleteCustomer(createdCustomer._id));

      expect(response).toBe(getMessage('UPDATE_CUSTOMER_SUCCESS'));
      expect(updatedCustomer.name).toBe('Assim Lan');
    });

    it('should not update a customer that doesnt exist', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      const response = await customerController.updateCustomer('iajsklaksj21', { name: 'Assim Lan' });
      toClean.push(customerController.deleteCustomer(createdCustomer._id));

      expect(response).toBe(getMessage('UPDATE_CUSTOMER_NONE'));
    });

    it('should delete a customer', async () => {
      const createdCustomer = await customerController.createCustomer(validCustomerBody as Customer);
      const response = await customerController.deleteCustomer(createdCustomer._id).catch((err) => {
        throw err;
      });
      expect(response).toEqual(getMessage('DELETE_CUSTOMER_SUCCESS'));
    });

    it('should delete no customer', async () => {
      const response = await customerController.deleteCustomer('1oidjak35612').catch((err) => {
        throw err;
      });
      expect(response).toEqual(getMessage('DELETE_CUSTOMER_NONE'));
    });

  });
});
