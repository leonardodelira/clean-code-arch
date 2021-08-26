import Order from './Order';
import OrderRepository from './orderRepository';

export default class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }

  save(order: Order): void {
    this.orders.push(order);
  }
}
