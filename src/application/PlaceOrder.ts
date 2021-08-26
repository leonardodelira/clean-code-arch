import { FreightCalculator } from '../domain/service/FreightCalculator';
import { PlaceOrderInput } from './PlaceOrderInput';
import { PlaceOrderOutput } from './PlaceOrderOutput';
import Order from '../domain/entity/Order';
import ZipCodeCalculatorAPI from '../domain/gateway/ZipCodeCalculatorAPI';
import ItemRepository from '../domain/repository/ItemRepository';
import CouponRepository from '../domain/repository/CouponRepository';
import OrderRepository from '../domain/repository/OrderRepository';

export default class PlaceOrder {
  zipCode: ZipCodeCalculatorAPI;
  itemRepository: ItemRepository;
  couponRepository: CouponRepository;
  orderRepository: OrderRepository;

  constructor(
    itemRepository: ItemRepository,
    couponRepository: CouponRepository,
    orderRepository: OrderRepository,
    zipCodeCalculator: ZipCodeCalculatorAPI
  ) {
    this.itemRepository = itemRepository;
    this.couponRepository = couponRepository;
    this.orderRepository = orderRepository;
    this.zipCode = zipCodeCalculator;
  }

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order(input.cpf);
    const distance = this.zipCode.calculate(input.zipCode, '13.426-00');
    for (const orderItem of input.items) {
      const item = this.itemRepository.getById(orderItem.id);
      if (!item) throw new Error('Item not found');
      order.addItem(orderItem.id, item.price, orderItem.quantity);
      order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
    }
    if (input.coupon) {
      const coupon = this.couponRepository.getByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    const total = order.getTotal();
    this.orderRepository.save(order);
    return {
      total,
      freight: order.freight,
    };
  }
}