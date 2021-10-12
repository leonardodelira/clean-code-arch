import { PlaceOrderInput } from './PlaceOrderInput';
import { PlaceOrderOutput } from './PlaceOrderOutput';
import ZipCodeCalculatorAPI from '../../domain/gateway/ZipCodeCalculatorAPI';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import OrderService from '../../domain/service/OrderService';

export default class PlaceOrder {
  zipCode: ZipCodeCalculatorAPI;
  repositoryFactory: RepositoryFactory;

  constructor(repositoryFactory: RepositoryFactory, zipCodeCalculator: ZipCodeCalculatorAPI) {
    this.repositoryFactory = repositoryFactory;
    this.zipCode = zipCodeCalculator;
  }

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const orderService = new OrderService(this.repositoryFactory, this.zipCode);
    const order = await orderService.create(input);
    const total = order.getTotal();
    return {
      total,
      code: order.code.value,
      freight: order.freight,
      taxes: order.taxes,
    };
  }
}
