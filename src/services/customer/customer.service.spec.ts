import { Test, TestingModule } from '@nestjs/testing';
import { bool } from 'joi';
import { Customer, CustomerDocument } from '../../models';
import { DBModule } from '../../modules';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { CustomerService } from './customer.service';

const model = new Customer();

describe('CustomerService', () => {
  let customerService;

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

  it('should update an existing customer', async () => {
    const customers = await customerService.getAllCustomers();

    if (!customers?.length) {
      expect(customers.length).toBeGreaterThanOrEqual(1);
    }

    const update = { name: 'newName' };
    await customerService.updateCustomer(customers?.[0]?.id, update);
    
    const updatedCustomers = await customerService.getAllCustomers();
    expect(updatedCustomers.filter(c => c.name === 'newName')?.[0].name).toBe('newName');
  });

  it('should delete an existing customer', () => {
    expect(false).toBeTruthy();
  });
});
