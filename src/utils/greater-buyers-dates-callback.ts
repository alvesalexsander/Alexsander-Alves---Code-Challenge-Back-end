import { DateTime } from 'luxon';

export function mostGreaterBuyersDatesCallback(dateSegment, purchase, response) {
  const existing = response['by'+dateSegment][DateTime.fromJSDate(purchase.createdAt)[dateSegment.toLowerCase()]]?.filter(entry => {
    console.log(entry);
    return  entry.buyerId.toString() === purchase.buyerId.toString()
  })?.[0];
  if (existing) {
    existing.spend += purchase.total;
    return;
  }
  response['by'+dateSegment][DateTime.fromJSDate(purchase.createdAt)[dateSegment.toLowerCase()]].push({
    buyerId: purchase.buyerId,
    spend: purchase.total
  });
}