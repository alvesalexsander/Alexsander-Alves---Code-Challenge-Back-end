import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { Product } from '../../models';
import { getMessage } from '../../utils/messages/get-message';
import { ProductService } from '../../services';
import { PaginatedQuery } from '../../models/dtos/paginated-query.dto';
import { QueryFilter, PaginatedFilter } from '../../utils';

@Controller('product')
export class ProductController {

  constructor(@Inject(ProductService) private readonly productService) { }
  

  @Get('/paginated')
  getPaginatedCustomers(@Query() query: PaginatedQuery & Partial<Product>) {
    const filter = new QueryFilter<Product>(query, ['name', 'price']);
    const pagination = new PaginatedFilter(query);
    return this.productService.getProductsAndCount(filter, null, pagination);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProduct({ _id: id });
  }

  @Post('/create')
  createProduct(@Body() body: Product) {
    return this.productService.createProduct(body);
  }

  @Put('/update/:id')
  async updateProduct(@Param('id') id: string, @Body() body: Partial<Product>) {
    return this.productService.updateProduct(id, body).then(result => {
      if (result === null) {
        return getMessage('UPDATE_PRODUCT_NONE');
      }
      return getMessage('UPDATE_PRODUCT_SUCCESS');
    }).catch(err => {
      console.error(err);
      return getMessage('UPDATE_PRODUCT_FAIL');
    });
  }

  @Delete('/remove/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id).then(op => {
      if (op.deletedCount === 1) {
        return getMessage('DELETE_PRODUCT_SUCCESS');
      }
      return getMessage('DELETE_PRODUCT_NONE');
    }).catch(err => {
      console.error(err);
      return getMessage('DELETE_PRODUCT_FAIL');
    });
  }

}
