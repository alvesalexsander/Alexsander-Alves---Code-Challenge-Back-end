import { Test, TestingModule } from '@nestjs/testing';
import { StatusStates } from '../../utils/enums/status-states';
import { Purchase } from '../../models';
import { DBModule } from '../../modules';
import { DBProviders, EntitiesProviders, Provider } from '../../providers';
import { PurchaseService } from './purchase.service';


describe('PurchaseService', () => {
  let purchaseService;
  const model = new Purchase();
    model.buyerId = '61fc644b2b49a378c58bff4b';
    model.items = [];
    model.total = 1;
    model.status = StatusStates.OPENED;

  const toClean = [];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [DBModule],
      providers: [
        DBProviders[Provider.MONGODB_CONNECTION],
        EntitiesProviders[Provider.PURCHASE_MODEL],
        PurchaseService,
      ],
    }).compile();

    purchaseService = app.get<PurchaseService>(PurchaseService);
  });

  afterAll(async () => {
    await Promise.all(toClean);
  });

  it('should create a new purchase', async () => {
    const createdPurchase = await purchaseService.createPurchase(model);
    toClean.push(purchaseService.deletePurchase(createdPurchase._id));
    for (const key in model) {
      expect(createdPurchase).toHaveProperty(key);
    }
  });

  it('should list all purchase', async () => {
    const purchases = await purchaseService.getPurchases();
    expect(purchases).toBeInstanceOf(Array);

    if (purchases?.length) {
      for (const purchase of purchases) {
        for (const key in model) {
          expect(purchase).toHaveProperty(key);
        }
      }
    }
  });

  it('should get a purchase', async () => {
    const createdPurchase = await purchaseService.createPurchase(model);
    toClean.push(purchaseService.deletePurchase(createdPurchase._id));

    const purchase = await purchaseService.getPurchase({ buyerId: createdPurchase.buyerId });
    for (const key in model) {
      expect(purchase).toHaveProperty(key);
    }
  });

  it('should update an existing purchase', async () => {
    const createdPurchase = await purchaseService.createPurchase(model);
    
    const update = { status: StatusStates.ACKNOWLEDGED };
    const updated = await purchaseService.updatePurchase(createdPurchase?.id, update);
    
    const updatedPurchase = await purchaseService.getPurchase({ _id: createdPurchase?.id });
    expect(updated.status).toBe(StatusStates.ACKNOWLEDGED);
    toClean.push(purchaseService.deletePurchase(createdPurchase._id));
  });

  it('should delete an existing purchase', async () => {
    const purchase = await purchaseService.createPurchase(model);
    await purchaseService.deletePurchase(purchase._id);
    const deletedPurchase = await purchaseService.getPurchase({ _id: purchase._id });
    expect(deletedPurchase).toBe(null);
  });

});
