import { ApplicationMessages } from "./messages.abstract";

class PtBR extends ApplicationMessages {
  readonly DELETE_CUSTOMER_SUCCESS = 'Cadastro do cliente removido com sucesso.';
  readonly DELETE_CUSTOMER_NONE = 'Cadastro do cliente não encontrado.';
  readonly DELETE_CUSTOMER_FAIL = 'Falha ao remover o cadastro do cliente.';

  readonly UPDATE_CUSTOMER_SUCCESS = 'Cadastro do cliente atualizado com sucesso.';
  readonly UPDATE_CUSTOMER_NONE = 'Cadastro do cliente não encontrado.';
  readonly UPDATE_CUSTOMER_FAIL = 'Falha ao atualizar cadastro do cliente.';

  readonly DELETE_PRODUCT_SUCCESS = 'Cadastro do cliente removido com sucesso.';
  readonly DELETE_PRODUCT_NONE = 'Cadastro do cliente não encontrado.';
  readonly DELETE_PRODUCT_FAIL = 'Falha ao remover o cadastro do cliente.';

  readonly UPDATE_PRODUCT_SUCCESS = 'Cadastro do cliente atualizado com sucesso.';
  readonly UPDATE_PRODUCT_NONE = 'Cadastro do cliente não encontrado.';
  readonly UPDATE_PRODUCT_FAIL = 'Falha ao atualizar cadastro do cliente.';

  readonly CREATE_PURCHASE_FAIL_CLIENT_NOT_FOUND = (buyerId) => `Compra não efetuada: Cliente ${buyerId ?? ''} não encontrado`;
  readonly CREATE_PURCHASE_FAIL_NO_ITEMS = 'Compra não efetuada. Necessário pelo menos um item para efetuar uma compra';
  readonly CREATE_PURCHASE_FAIL_MALFORMED_ITEM = (item) => `Compra não efetuada. Item mal formatado: ${JSON.stringify(item)}}`;
  readonly CREATE_PURCHASE_FAIL_PRODUCT_NOT_FOUND = (productId) => `Compra não efetuada: Produto ${productId ?? ''} não encontrado.`;
  readonly CREATE_PURCHASE_FAIL_PRODUCT_OUT_OF_STOCK = ({productId, amount}) => `Compra não efetuada: Produto ${productId} não está disponível na quantidade requisitada (${amount}).`;
  readonly CREATE_PURCHASE_FAIL_PRODUCT_PRICE_OUTBOUND = ({productId, clientSidePrice, price}) => `Compra não efetuada: Produto ${productId} não possui mais o mesmo valor da oferta. Oferta: ${clientSidePrice} / Preço atual: ${price}`;
}

const PtBRInstance = new PtBR();
export { PtBRInstance as PtBR };