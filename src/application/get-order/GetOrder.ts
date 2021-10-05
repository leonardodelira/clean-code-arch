import ItemRepository from '../../domain/repository/ItemRepository';
import CouponRepository from '../../domain/repository/CouponRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import { GetOrderOutput } from './GetOrderOutput';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';

export default class GetOrder {
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(code: string): Promise<GetOrderOutput> {
    const order = await this.orderRepository.get(code);
    const orderItems = [];
    for (const ordemItem of order.items) {
      const item = await this.itemRepository.getById(ordemItem.id);
      const orderItemOutput = {
        itemDescription: item?.description,
        price: ordemItem.price,
        quantity: ordemItem.quantity,
      };
      orderItems.push(orderItemOutput);
    }
    return {
      code: order.code.value,
      freight: order.freight,
      total: order.getTotal(),
      orderItems,
    };
  }
}
