import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Provider } from '../../providers';

@Controller('customer')
export class CustomerController {

  constructor(@Inject(Provider.CUSTOMER_SERVICE) private readonly customerService) { }

  @Get('ping')
  ping(): string {
    return 'pong';
  }

  @Get('/:id')
  getCustomerById(@Param('id') id) {
    console.log(Object.keys(this.customerService))
    return this.customerService.getCustomer({ _id: id });
  }

}
