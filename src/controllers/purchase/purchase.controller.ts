import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Post, Put, Query, Res } from '@nestjs/common';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { Purchase, PurchasedItemBuilder } from '../../models';
import { getMessage } from '../../utils/messages/get-message';
import { PaginatedFilter, QueryFilter, validateBuyerId } from '../../utils';
import { PaginatedQuery } from '../../models/dtos/paginated-query.dto';
import { PurchaseOrderDTO } from '../../models/dtos/purchase-order.dto';
import { Types } from 'mongoose';
import { DateTime } from 'luxon';
import { PurchasesByDate } from '../../utils/purchase-by-date';
import { validatePurchaseItems } from 'src/utils/validations/validate-purchase-items';

@Controller('purchase')
export class PurchaseController {

  constructor(
    @Inject(PurchaseService) private readonly purchaseService,
    @Inject('CUSTOMER_MODEL') private customerModel,
    @Inject('PRODUCT_MODEL') private productModel
  ) { }

  @Get('/paginated')
  getPaginatedPurchases(@Query() query: PaginatedQuery & Partial<Purchase>) {
    const filter = new QueryFilter<Purchase>(query, ['buyerId', 'status']);
    const pagination = new PaginatedFilter(query);
    return this.purchaseService.getPurchasesAndCount(filter, null, pagination);
  }

  @Get('/customer/:customerId')
  getPurchaseByCustomerId(@Param('customerId') customerId: string, @Query() query: any) {
    return this.purchaseService.getPurchases({ buyerId: customerId });
  }

  @Get('/customer-by-dates/:customerId')
  async getPurchasesByCustomerDates(@Param('customerId') customerId: string) {
    const purchases = await this.purchaseService.getPurchases({ buyerId: new Types.ObjectId(customerId) });
    const response = new PurchasesByDate();
    if (!purchases?.length) {
      return response;
    }

    this.getPurchasesByDate(purchases, 'full', response);
    return response;
  }

  @Get('/customer-by-day/:customerId')
  async getPurchasesByCustomerDay(@Param('customerId') customerId: string) {
    const purchases = await this.purchaseService.getPurchases({ buyerId: new Types.ObjectId(customerId) });
    const response = new PurchasesByDate();
    if (!purchases?.length) {
      return response;
    }

    this.getPurchasesByDate(purchases, 'day', response);
    return response;
  }

  @Get('/customer-by-month/:customerId')
  async getPurchasesByCustomerMonth(@Param('customerId') customerId: string) {
    const purchases = await this.purchaseService.getPurchases({ buyerId: new Types.ObjectId(customerId) });
    const response = new PurchasesByDate();
    if (!purchases?.length) {
      return response;
    }

    this.getPurchasesByDate(purchases, 'month', response);
    return response;
  }

  @Get('/customer-by-year/:customerId')
  async getPurchasesByCustomerYear(@Param('customerId') customerId: string) {
    const purchases = await this.purchaseService.getPurchases({ buyerId: new Types.ObjectId(customerId) });
    const response = new PurchasesByDate();
    if (!purchases?.length) {
      return response;
    }

    this.getPurchasesByDate(purchases, 'year', response);
    return response;
  }

  @Get('/most-sold')
  async getMostSoldProducts() {
    const purchases = await this.purchaseService.getPurchases({});
    const response = new PurchasesByDate();
    if (!purchases?.length) {
      return response;
    }

    this.getMostSoldByDate(purchases, 'full', response);
    return response;
  }

  @Get('/greater-buyers')
  async getGreaterBuyers() {
    const purchases = await this.purchaseService.getPurchases({});
    const response = new PurchasesByDate();
    if (!purchases?.length) {
      return response;
    }

    this.getGreaterBuyersByDate(purchases, 'full', response);
    return response;
  }

  @Get('/:id')
  getPurchaseById(@Param('id') id: string) {
    return this.purchaseService.getPurchase({ _id: id });
  }

  @Post('/create')
  async createPurchase(@Body() body: PurchaseOrderDTO) {
    const requirements = await Promise.all([
      validateBuyerId.bind(this)(body?.buyerId),
      validatePurchaseItems.bind(this)(body?.items)
    ]);

    if (!requirements[0]) {
      throw new HttpException(getMessage('CREATE_PURCHASE_FAIL_CLIENT_NOT_FOUND', body?.buyerId), HttpStatus.NOT_FOUND);
    }

    const purchase = new Purchase();
    purchase.buyerId = body.buyerId;
    purchase.items = requirements[1].map((product, index) => {
      return new PurchasedItemBuilder()
        .productId(product._id)
        .productName(product.name)
        .productPrice(product.price)
        .amount(body.items[index]?.amount)
        .build();
    });

    return this.purchaseService.createPurchase(purchase)
      .then(async (createdPurchase) => {
        await Promise.all(requirements[1].map((product, index) => {
          return this.productModel.updateOne(
            { _id: new Types.ObjectId(product._id) },
            { stock: product.stock - purchase.items[index]?.amount })
        }));

        return createdPurchase;
      });
  }

  @Put('/update/:id')
  async updatePurchase(@Param('id') id: string, @Body() body: Partial<Purchase>) {
    return this.purchaseService.updatePurchase(id, body).then(result => {
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
  async deletePurchase(@Param('id') id: string) {
    return this.purchaseService.deletePurchase(id).then(op => {
      if (op.deletedCount === 1) {
        return getMessage('DELETE_CUSTOMER_SUCCESS');
      }
      return getMessage('DELETE_CUSTOMER_NONE');
    }).catch(err => {
      console.error(err);
      return getMessage('DELETE_CUSTOMER_FAIL');
    });
  }

  private getPurchasesByDate(purchases: any, dateSegment: 'day' | 'month' | 'year' | 'full', response: PurchasesByDate) {
    for (const purchase of purchases) {
      switch (dateSegment) {
        case 'day':
          return response.setByDay(purchase, (p, r) => {
            r.byDay[DateTime.fromJSDate(p.createdAt).day].push(p.id);
          });
        case 'month':
          response.setByMonth(purchase, (p, r) => {
            r.byMonth[DateTime.fromJSDate(p.createdAt).month].push(p.id);
          });
          break;
        case 'year':
          response.setByYear(purchase, (p, r) => {
            r.byYear[DateTime.fromJSDate(p.createdAt).year].push(p.id);
          });
          break;
        case 'full':
          response.setByDay(purchase, (p, r) => {
            r.byDay[DateTime.fromJSDate(p.createdAt).day].push(p.id);
          });
          response.setByMonth(purchase, (p, r) => {
            r.byMonth[DateTime.fromJSDate(p.createdAt).month].push(p.id);
          });
          response.setByYear(purchase, (p, r) => {
            r.byYear[DateTime.fromJSDate(p.createdAt).year].push(p.id);
          });
      }
    }
  }

  private getMostSoldByDate(purchases: any, dateSegment: 'day' | 'month' | 'year' | 'full', response: PurchasesByDate) {
    for (const purchase of purchases) {
      for (const item of purchase.items) {
        switch (dateSegment) {
          case 'day':
            response.setByDay(purchase, (p, response) => this.mostSoldByDatesCallback('Day', item, p, response));
            break;
          case 'month':
            response.setByMonth(purchase, (p, response) => this.mostSoldByDatesCallback('Month', item, p, response));
            break;
          case 'year':
            response.setByYear(purchase, (p, response) => this.mostSoldByDatesCallback('Year', item, p, response));
            break;
          case 'full':
            response.setByDay(purchase, (p, response) => this.mostSoldByDatesCallback('Day', item, p, response));
            response.setByMonth(purchase, (p, response) => this.mostSoldByDatesCallback('Month', item, p, response));
            response.setByYear(purchase, (p, response) => this.mostSoldByDatesCallback('Year', item, p, response));
        }
      }
    }
    
    if (response['byDay']) {
      for (const day in response['byDay']) {
        response['byDay'][day] = response['byDay']?.[day].sort(((a, b) => a.amount > b.amount ? -1 : 1))
      }
    }
    if (response['byMonth']) {
      for (const month in response['byMonth']) {
        response['byMonth'][month] = response['byMonth']?.[month].sort(((a, b) => a.amount > b.amount ? -1 : 1))
      }
    }
    if (response['byYear']) {
      for (const year in response['byYear']) {
        response['byYear'][year] = response['byYear']?.[year].sort(((a, b) => a.amount > b.amount ? -1 : 1))
      }
    }
    
  }
  mostSoldByDatesCallback(arg0: string, item: any, p: any, response: any) {
    throw new Error('Method not implemented.');
  }

  private getGreaterBuyersByDate(purchases: any, dateSegment: 'day' | 'month' | 'year' | 'full', response: PurchasesByDate) {
    for (const purchase of purchases) {
      switch (dateSegment) {
        case 'day':
          response.setByDay(purchase, (p, response) => this.mostGreaterBuyersDatesCallback('Day', p, response));
          break;
        case 'month':
          response.setByMonth(purchase, (p, response) => this.mostGreaterBuyersDatesCallback('Month', p, response));
          break;
        case 'year':
          response.setByYear(purchase, (p, response) => this.mostGreaterBuyersDatesCallback('Year', p, response));
          break;
        case 'full':
          response.setByDay(purchase, (p, response) => this.mostGreaterBuyersDatesCallback('Day', p, response));
          response.setByMonth(purchase, (p, response) => this.mostGreaterBuyersDatesCallback('Month', p, response));
          response.setByYear(purchase, (p, response) => this.mostGreaterBuyersDatesCallback('Year', p, response));
      }
    }
    
    if (response['byDay']) {
      for (const day in response['byDay']) {
        response['byDay'][day] = response['byDay']?.[day].sort(((a, b) => a.amount > b.amount ? -1 : 1))
      }
    }
    if (response['byMonth']) {
      for (const month in response['byMonth']) {
        response['byMonth'][month] = response['byMonth']?.[month].sort(((a, b) => a.amount > b.amount ? -1 : 1))
      }
    }
    if (response['byYear']) {
      for (const year in response['byYear']) {
        response['byYear'][year] = response['byYear']?.[year].sort(((a, b) => a.amount > b.amount ? -1 : 1))
      }
    }
    
  }
  mostGreaterBuyersDatesCallback(arg0: string, p: any, response: any) {
    throw new Error('Method not implemented.');
  }


}
