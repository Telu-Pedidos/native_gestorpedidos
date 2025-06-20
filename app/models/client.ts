import { clientSchema } from "@/app/validations/client-validation";
import { z } from "zod";
import { OrderResponse } from "./order";

export type ClientDTO = z.infer<typeof clientSchema>;

export type ClientResponse = ClientDTO & {
  id: string;
  createdAt: string;
  updatedAt: string;
  orders?: OrderResponse[];
};
