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
}

const PtBRInstance = new PtBR();
export { PtBRInstance as PtBR };