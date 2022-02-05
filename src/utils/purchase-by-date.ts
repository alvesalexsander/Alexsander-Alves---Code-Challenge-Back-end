import { DateTime } from 'luxon';

export class PurchasesByDate {
  buyerId: string;

  setByDay(purchase, dataCallback) {
    if (!this['byDay']) {
      this['byDay'] = {};
    }
    const date = DateTime.fromJSDate(purchase.createdAt);
    if (!this['byDay'][date.day]) {
      this['byDay'][date.day] = [];
    }
    dataCallback(purchase, this);
  }

  setByMonth(purchase, dataCallback) {
    if (!this['byMonth']) {
      this['byMonth'] = {};
    }
    const date = DateTime.fromJSDate(purchase.createdAt);
    if (!this['byMonth'][date.month]) {
      this['byMonth'][date.month] = [];
    }
    dataCallback(purchase, this);
  }

  setByYear(purchase, dataCallback) {
    if (!this['byYear']) {
      this['byYear'] = {};
    }
    const date = DateTime.fromJSDate(purchase.createdAt);
    if (!this['byYear'][date.year]) {
      this['byYear'][date.year] = [];
    }
    dataCallback(purchase, this);
  }
}