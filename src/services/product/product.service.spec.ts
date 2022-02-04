import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../../models';
import { DBModule } from '../../modules';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { ProductService } from './product.service';


describe('ProductService', () => {
  let productService;
  const model = new Product();
    model.name = 'Lápis';
    model.stock = 1;
    model.price = 1000;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DBModule],
      providers: [
        DBProviders[Provider.MONGODB_CONNECTION],
        EntitiesProviders[Provider.PRODUCT_MODEL],
        ProductService,
      ],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });

  it('should create a new product', async () => {
    const createdCustomer = await productService.createProduct(model);
    for (const key in model) {
      expect(createdCustomer).toHaveProperty(key);
    }
  });

  it('should list all products', async () => {
    const products = await productService.getProducts();
    expect(products).toBeInstanceOf(Array);

    if (products?.length) {
      for (const product of products) {
        for (const key in model) {
          expect(product).toHaveProperty(key);
        }
      }
    }
  });

  it('should get a product', async () => {
    const product = await productService.getProduct({ name: 'Lápis' });
    for (const key in model) {
      expect(product).toHaveProperty(key);
    }
  });

  it('should update an existing product', async () => {
    const product = await productService.getProduct({ name: 'Lápis' });

    const update = { name: 'newName' };
    await productService.updateProduct(product?.id, update);

    const updatedCustomer = await productService.getProduct({ name: 'newName' });
    expect(updatedCustomer.name).toBe('newName');
  });

  it('should delete an existing product', async () => {
    const product = await productService.getProduct({ name: 'newName' });
    await productService.deleteProduct(product._id);
    const deletedCustomer = await productService.getProduct({ name: 'newName' });
    // TODO apagar collection no beforeAll
    expect(deletedCustomer).toBe(null);
  });

});
