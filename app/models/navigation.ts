import { ClientResponse } from "./client";

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Order: undefined;
  Login: undefined;
  NotFound: undefined;
  Clients: undefined;
  Client: undefined;
  ClientEdit: { client: ClientResponse };
  ClientRegister: undefined;
};
