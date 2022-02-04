import { Inject, Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Customer, CustomerDocument } from "../../models";

@Injectable()
export class CustomerService {

  constructor(@Inject('CUSTOMER_MODEL') private customerModel) { }

  async getCustomers(filter: any, projection: any): Promise<CustomerDocument[]> {
    return this.customerModel.find(filter, projection);
  }

  async getCustomer(filter: any): Promise<CustomerDocument> {
    return this.customerModel.findOne(filter);
  }

  async createCustomer(customer: Customer): Promise<any> {
    return this.customerModel.create(customer);
  }

  async updateCustomer(customerId: string, updateData: Partial<Customer>): Promise<any> {
    return this.customerModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(customerId)
      },
      {
        updatedAt: new Date(),
        ...updateData,
      },
      {
        new: true
      });
  }

  async deleteCustomer(customerId: string): Promise<any> {
    return this.customerModel.deleteOne({ _id: new Types.ObjectId(customerId) });
  }
}