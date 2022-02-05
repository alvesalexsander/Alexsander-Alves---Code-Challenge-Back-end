export abstract class ApplicationMessages {
  public abstract readonly DELETE_CUSTOMER_SUCCESS: ApplicationMessage;
  public abstract readonly DELETE_CUSTOMER_NONE: ApplicationMessage;
  public abstract readonly DELETE_CUSTOMER_FAIL: ApplicationMessage;

  public abstract readonly UPDATE_CUSTOMER_SUCCESS: ApplicationMessage;
  public abstract readonly UPDATE_CUSTOMER_NONE: ApplicationMessage;
  public abstract readonly UPDATE_CUSTOMER_FAIL: ApplicationMessage;

  public abstract readonly DELETE_PRODUCT_SUCCESS: ApplicationMessage;
  public abstract readonly DELETE_PRODUCT_NONE: ApplicationMessage;
  public abstract readonly DELETE_PRODUCT_FAIL: ApplicationMessage;

  public abstract readonly UPDATE_PRODUCT_SUCCESS: ApplicationMessage;
  public abstract readonly UPDATE_PRODUCT_NONE: ApplicationMessage;
  public abstract readonly UPDATE_PRODUCT_FAIL: ApplicationMessage;

  public abstract readonly CREATE_PURCHASE_FAIL_CLIENT_NOT_FOUND: ApplicationMessage;
  public abstract readonly CREATE_PURCHASE_FAIL_NO_ITEMS: ApplicationMessage;
  public abstract readonly CREATE_PURCHASE_FAIL_MALFORMED_ITEM: ApplicationMessage;
  public abstract readonly CREATE_PURCHASE_FAIL_PRODUCT_NOT_FOUND: ApplicationMessage;
  public abstract readonly CREATE_PURCHASE_FAIL_PRODUCT_OUT_OF_STOCK: ApplicationMessage;
  public abstract readonly CREATE_PURCHASE_FAIL_PRODUCT_PRICE_OUTBOUND: ApplicationMessage;

}

export type ApplicationMessage = string | ((...args) => string);

export type ApplicationMessageOptions = keyof ApplicationMessages;