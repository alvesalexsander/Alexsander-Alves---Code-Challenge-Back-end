import { DateTime } from 'luxon';

export function mostSoldByDatesCallback(dateSegment, item, purchase, response) {
  const existing = response['by'+dateSegment][DateTime.fromJSDate(purchase.createdAt)[dateSegment.toLowerCase()]]?.filter(entry => entry.id.toString() === item.productId.toString())?.[0];
  if (existing) {
    existing.amount += item.amount;
    return;
  }
  response['by'+dateSegment][DateTime.fromJSDate(purchase.createdAt)[dateSegment.toLowerCase()]].push({
    id: item.productId,
    amount: item.amount
  });
}