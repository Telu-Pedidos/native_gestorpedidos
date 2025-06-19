import { CategoryResponse } from "./category";
import { ClientResponse } from "./client";
import { ModelResponse } from "./model";
import { OrderResponse } from "./order";
import { ProductResponse } from "./product";

export type RootStackParamList = {
  Menu: undefined;
  Welcome: undefined;
  Home: undefined;
  Login: undefined;
  NotFound: undefined;

  Orders: undefined;
  Order: undefined;
  OrderEdit: { order: OrderResponse };
  OrderRegister: { order: OrderResponse };

  Products: undefined;
  Product: undefined;
  ProductEdit: { product: ProductResponse };
  ProductRegister: undefined;

  Clients: undefined;
  Client: undefined;
  ClientEdit: { client: ClientResponse };
  ClientRegister: undefined;

  Models: undefined;
  Model: undefined;
  ModelEdit: { model: ModelResponse };
  ModelRegister: undefined;

  Categories: undefined;
  Category: undefined;
  CategoryEdit: { category: CategoryResponse };
  CategoryRegister: undefined;
};
