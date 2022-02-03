import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from '../../services/customer/customer.service';
import { Customer } from '../../models';

@Controller('customer')
export class CustomerController {

  constructor(@Inject(CustomerService) private readonly customerService) { }

  @Get('ping')
  ping(): string {
    return 'pong';
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
  updateCustomer(@Param('id') id: string, @Body() body: Partial<Customer>) {
    return this.customerService.updateCustomer(id, body);
  }

  @Delete('/remove/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }

}
