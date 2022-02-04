import { Test, TestingModule } from '@nestjs/testing';
import { Customer } from '../../models';
import { DBModule } from '../../modules';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { CustomerService } from './customer.service';


describe('CustomerService', () => {
  let customerService;
  const model = new Customer();
  model.name = 'Assim Lin';
  model.email = 'assim@lin.com';
  model.phoneNumber = '22999999999';
  
  const toClean = [];

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

  afterAll(async () => {
    await Promise.all(toClean);
  });

  it('should create a new customer', async () => {

    const createdCustomer = await customerService.createCustomer(model);
    toClean.push(customerService.deleteCustomer(createdCustomer._id));
    for (const key in model) {
      expect(createdCustomer).toHaveProperty(key);
    }
  });

  it('should list all customers', async () => {
    const customers = await customerService.getCustomers();
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
    await customerService.createCustomer(model);
    const customer = await customerService.getCustomer({ name: 'Assim Lin' });
    for (const key in model) {
      expect(customer).toHaveProperty(key);
    }
  });

  it('should update an existing customer', async () => {
    await customerService.createCustomer(model);
    const customer = await customerService.getCustomer({ name: 'Assim Lin' });

    const update = { name: 'newName' };
    const updatedCustomer = await customerService.updateCustomer(customer?.id, update);
    expect(updatedCustomer.name).toBe('newName');
  });

  it('should delete an existing customer', async () => {
    const customer = await customerService.getCustomer({ name: 'newName' });
    await customerService.deleteCustomer(customer._id);
    const deletedCustomer = await customerService.getCustomer({ name: 'newName' });
    expect(deletedCustomer).toBe(null);
  });
});
