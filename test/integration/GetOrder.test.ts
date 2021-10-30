import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/ZipCodeCalculatorAPIMemory';
import PlaceOrder from '../../src/application/place-order/PlaceOrder';
import GetOrder from '../../src/application/get-order/GetOrder';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';
import ZipCodeCalculatorAPI from '../../src/domain/gateway/ZipCodeCalculatorAPI';
import RepositoryFactory from '../../src/domain/factory/RepositoryFactory';

let repositoryFactory: RepositoryFactory;
let zipCodeCalculator: ZipCodeCalculatorAPI;

beforeEach(async function () {
  repositoryFactory = new DatabaseRepositoryFactory();
  const orderRepository = repositoryFactory.createOrderRepository();
  const stockEntryRepository = repositoryFactory.createStockEntryRepository();
  await stockEntryRepository.clean();
  await orderRepository.clean();
  zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
});

test('Deve consultar um pedido', async function () {
  const input = {
    cpf: '778.278.412-36',
    zipCode: '13.426.059',
    items: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
      { id: 3, quantity: 3 },
    ],
    coupon: 'VALE20',
  };
  const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculator);
  const output = await placeOrder.execute(input);
  const getOrder = new GetOrder(new DatabaseRepositoryFactory());
  const getOrderOutput = await getOrder.execute(output.code);
  expect(getOrderOutput.total).toBe(5982);
});
