import Order from '../entity/Order';
import RepositoryFactory from '../factory/RepositoryFactory';
import ZipCodeCalculatorAPI from '../gateway/ZipCodeCalculatorAPI';
import CouponRepository from '../repository/CouponRepository';
import ItemRepository from '../repository/ItemRepository';
import OrderRepository from '../repository/OrderRepository';
import TaxTableRepository from '../repository/TaxTableRepository';
import { PlaceOrderInput } from '../../application/place-order/PlaceOrderInput';
import TaxCalculatorFactory from '../factory/TaxCalculatorFactory';
import { FreightCalculator } from './FreightCalculator';

export default class OrderService {
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

  async create(input: PlaceOrderInput) {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.issueDate, sequence);
    const distance = this.zipCode.calculate(input.zipCode, '99.999-99');
    const taxCalculator = TaxCalculatorFactory.create(input.issueDate);
    for (const orderItem of input.items) {
      const item = await this.itemRepository.getById(orderItem.id);
      if (!item) throw new Error('Item not found');
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
      const taxTables = await this.taxTableRepository.getByIdItem(item.id);
      const taxes = taxCalculator.calculate(item, taxTables);
      order.taxes += taxes * orderItem.quantity;
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    return order;
  }
}
