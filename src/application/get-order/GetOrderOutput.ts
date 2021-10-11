import OrderItem from '../../domain/entity/OrderItem';

export type GetOrderOutput = {
  total: number;
  code: string;
  freight: number;
  taxes: number;
  orderItems: {
    itemDescription?: string;
    price: number;
    quantity: number;
  }[];
};
