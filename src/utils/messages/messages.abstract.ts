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

}

export type ApplicationMessage = string | ((...args) => string);

export type ApplicationMessageOptions = keyof ApplicationMessages;