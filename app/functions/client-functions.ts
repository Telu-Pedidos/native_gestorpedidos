import { OrderDTO } from "@/app/models/order";

export const copyPhone = (phoneNumber: string) => {
  navigator.clipboard.writeText(phoneNumber);
};

export const getQuantityOrders = (client: any) => {
  const orders = client.orders;
  const quantityOrders = orders ? orders?.length : 0;
  return quantityOrders;
};

export const getLastDateOrder = (client: any): string | null => {
  if (!client?.orders || client.orders.length === 0) return null;
  const lastOrder = client.orders[client.orders.length - 1];
  return lastOrder.updatedAt || null;
};

export const getTotalSpentOrder = (client: any) => {
  const orders = client.orders;
  const total =
    orders?.reduce(
      (sum: number, order: OrderDTO) => sum + (order.total ? order?.total : 0),
      0,
    ) ?? 0;
  return total;
};
