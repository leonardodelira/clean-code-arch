import { FreightCalculator } from '../../domain/service/FreightCalculator';
import { PlaceOrderInput } from './PlaceOrderInput';
import { PlaceOrderOutput } from './PlaceOrderOutput';
import Order from '../../domain/entity/Order';
import ZipCodeCalculatorAPI from '../../domain/gateway/ZipCodeCalculatorAPI';
import ItemRepository from '../../domain/repository/ItemRepository';
import CouponRepository from '../../domain/repository/CouponRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import TaxTableRepository from '../../domain/repository/TaxTableRepository';

export default class PlaceOrder {
  zipCode: ZipCodeCalculatorAPI;
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;
  taxTableRepository: TaxTableRepository;

  constructor(repositoryFactory: RepositoryFactory, zipCodeCalculator: ZipCodeCalculatorAPI) {
    this.itemRepository = repositoryFactory.createItemRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.taxTableRepository = repositoryFactory.createTaxTableRepository();
    this.zipCode = zipCodeCalculator;
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.issueDate, sequence);
    const distance = this.zipCode.calculate(input.zipCode, '99.999-99');
    for (const orderItem of input.items) {
      const item = await this.itemRepository.getById(orderItem.id);
      if (!item) throw new Error('Item not found');
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
      const taxTables = await this.taxTableRepository.getByIdItem(item.id);
      console.log(taxTables);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    await this.orderRepository.save(order);
    return {
      total,
      code: order.code.value,
      freight: order.freight,
      taxes: order.taxes,
    };
  }
}
