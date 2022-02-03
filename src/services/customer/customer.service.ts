import { Inject, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Customer, CustomerDocument } from "../../models";
import { Provider } from "../../providers";

@Injectable()
export class CustomerService {

  constructor(@Inject('CUSTOMER_MODEL') private customerModel) { }

  async getAllCustomers(): Promise<CustomerDocument[]> {
    return this.customerModel.find({});
  }

  async getCustomer(query: any): Promise<CustomerDocument> {
    return this.customerModel.findOne(query);
  }

  async createCustomer(customer: Customer): Promise<any> {
    return this.customerModel.create(customer);
  }

  async updateCustomer(customerId: string, updateData: Partial<Customer>): Promise<any> {
    return this.customerModel.findOneAndUpdate(
      { _id: new Types.ObjectId(customerId) },
      updateData);
  }

  async deleteCustomer(customerId: string): Promise<any> {
    return this.customerModel.deleteOne({ _id: new Types.ObjectId(customerId) });
  }
}