import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models';
import { getMessage } from '../../utils/messages/get-message';

@Controller('customer')
export class CustomerController {

  constructor(@Inject(CustomerService) private readonly customerService) { }


  @Get('/paginated')
  getPaginatedCustomers(@Query() query: any) {
    console.log(query)
    return this.customerService.getCustomers(query);
  }
  
  @Get('/:id')
  getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomer({ _id: id });
  }

  @Post('/create')
  createCustomer(@Body() body: Customer) {
    return this.customerService.createCustomer(body);
  }

  @Put('/update/:id')
  async updateCustomer(@Param('id') id: string, @Body() body: Partial<Customer>) {
    return this.customerService.updateCustomer(id, body).then(result => {
      if (result === null) {
        return getMessage('UPDATE_CUSTOMER_NONE');
      }
      return getMessage('UPDATE_CUSTOMER_SUCCESS');
    }).catch(err => {
      console.error(err);
      return getMessage('UPDATE_CUSTOMER_FAIL');
    });
  }

  @Delete('/remove/:id')
  async deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id).then(op => {
      if (op.deletedCount === 1) {
        return getMessage('DELETE_CUSTOMER_SUCCESS');
      }
      return getMessage('DELETE_CUSTOMER_NONE');
    }).catch(err => {
      console.error(err);
      return getMessage('DELETE_CUSTOMER_FAIL');
    });
  }

}
