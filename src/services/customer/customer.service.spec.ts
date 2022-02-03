import { Test, TestingModule } from '@nestjs/testing';
import { bool } from 'joi';
import { Customer, CustomerDocument } from '../../models';
import { DBModule } from '../../modules';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { CustomerService } from './customer.service';


describe('CustomerService', () => {
  let customerService;
  const model = new Customer();

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DBModule],
      providers: [
        DBProviders[Provider.MONGODB_CONNECTION],
        EntitiesProviders[Provider.CUSTOMER_MODEL],
        CustomerService,
      ],
    }).compile();

    customerService = app.get<CustomerService>(CustomerService);
  });

  it('should create a new customer', async () => {
    const data = new Customer();
    data.name = 'Assim Lin';
    data.email = 'assim@lin.com';
    data.phoneNumber = '22999999999';

    const createdCustomer = await customerService.createCustomer(data);
    for (const key in model) {
      expect(createdCustomer).toHaveProperty(key);
    }
  });

  it('should list all customers', async () => {
    const customers = await customerService.getAllCustomers();
    expect(customers).toBeInstanceOf(Array);

    if (customers?.length) {
      for (const customer of customers) {
        for (const key in model) {
          expect(customer).toHaveProperty(key);
        }
      }
    }
  });

  it('should get a customer', async () => {
    const customer = await customerService.getCustomer({ name: 'Assim Lin' });
    for (const key in model) {
      expect(customer).toHaveProperty(key);
    }
  });

  it('should update an existing customer', async () => {
    const customer = await customerService.getCustomer({ name: 'Assim Lin' });

    const update = { name: 'newName' };
    await customerService.updateCustomer(customer?.id, update);

    const updatedCustomer = await customerService.getCustomer({ name: 'newName' });
    expect(updatedCustomer.name).toBe('newName');
  });

  it('should delete an existing customer', async () => {
    const customer = await customerService.getCustomer({ name: 'newName' });
    await customerService.deleteCustomer(customer._id);
    const deletedCustomer = await customerService.getCustomer({ name: 'newName' });
    // TODO apagar collection no beforeAll
    expect(deletedCustomer).toBe(null);
  });
});
