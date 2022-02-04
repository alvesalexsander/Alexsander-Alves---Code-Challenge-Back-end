import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../../models';
import { ProductService } from '../../services';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { ProductController } from './product.controller';
import { getMessage } from '../../utils/messages/get-message';

describe('ProductController', () => {
  let productController: ProductController;
  const toClean = [];

  const validProductBody = {
    name: 'valid product',
    stock: 1,
    price: 1000,
  };

  const invalidProductBody = {
    name: 'INVALID product',
    price: 1000,
    stock: 'asd', // invalid stock
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        EntitiesProviders[Provider.PRODUCT_MODEL],
        ...Object.values(DBProviders),
        ProductService
      ]
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  afterAll(async () => {
    await Promise.all(toClean);
  })

  describe('features', () => {

    it('should return a product', async () => {
      const createdProduct = await productController.createProduct(validProductBody as Product);
      const product = await productController.getProductById(createdProduct._id.toString());
      toClean.push(productController.deleteProduct(product._id));
    
      expect(product).toBeTruthy();
    });

    it('should create a product', async () => {
      const createdProduct = await productController.createProduct(validProductBody as Product);
      toClean.push(productController.deleteProduct(createdProduct._id));
      expect(createdProduct).toBeTruthy();
    });

    it('should not create a product with invalid data', async () => {
      await productController.createProduct(invalidProductBody as Product).then((result) => {
        // se o produto for criado com sucesso, dispara um erro intencional.
        throw new Error('should not create a product :: failed :: product created with invalid stock');
      }).catch((err) => {
        expect(Object.keys(err.errors)).toContain('stock');
      });
    });

    it('should update a product', async () => {
      const createdProduct = await productController.createProduct(validProductBody as Product);
      const response = await productController.updateProduct(createdProduct._id, { name: 'newName' });
      const updatedProduct = await productController.getProductById(createdProduct._id.toString());
      toClean.push(productController.deleteProduct(createdProduct._id));

      expect(response).toBe(getMessage('UPDATE_PRODUCT_SUCCESS'));
      expect(updatedProduct.name).toBe('newName');
    });

    it('should not update a product that doesnt exist', async () => {
      const createdProduct = await productController.createProduct(validProductBody as Product);
      const response = await productController.updateProduct('iajsklaksj21', { name: 'newName' });
      toClean.push(productController.deleteProduct(createdProduct._id));

      expect(response).toBe(getMessage('UPDATE_PRODUCT_NONE'));
    });

    it('should delete a product', async () => {
      const createdProduct = await productController.createProduct(validProductBody as Product);
      const response = await productController.deleteProduct(createdProduct._id).catch((err) => {
        throw err;
      });
      expect(response).toEqual(getMessage('DELETE_PRODUCT_SUCCESS'));
    });

    it('should delete no product', async () => {
      const response = await productController.deleteProduct('1oidjak35612').catch((err) => {
        throw err;
      });
      expect(response).toEqual(getMessage('DELETE_PRODUCT_NONE'));
    });

  });
});
