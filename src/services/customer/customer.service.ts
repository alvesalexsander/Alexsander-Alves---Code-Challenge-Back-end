import { Inject, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Customer } from "src/models";
import { Provider } from "../../providers";

@Injectable()
export class CustomerService {

  constructor(@Inject('CUSTOMER_MODEL') private customerModel) { }

  getAllCustomers(): any {
    return this.customerModel.find({});
  }

  createCustomer(customer: Customer): any {
    return this.customerModel.create(customer);
  }

  updateCustomer(customerId: string, updateData: Partial<Customer>): any {
    return this.customerModel.findOneAndUpdate(
      { _id: new Types.ObjectId(customerId) },
      updateData);
  }
}