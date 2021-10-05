import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';
import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/ZipCodeCalculatorAPIMemory';
import PlaceOrder from '../../src/application/place-order/PlaceOrder';
import RepositoryFactory from '../../src/domain/factory/RepositoryFactory';
import ZipCodeCalculatorAPI from '../../src/domain/gateway/ZipCodeCalculatorAPI';

let repositoryFactory: RepositoryFactory;
let zipCodeCalculator: ZipCodeCalculatorAPI;

beforeEach(async function () {
  repositoryFactory = new DatabaseRepositoryFactory();
  const orderRepository = repositoryFactory.createOrderRepository();
  await orderRepository.clean();
  zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
});

test('Deve fazer um pedido', async function () {
  const input = {
    cpf: '778.278.412-36',
    zipCode: '13.426.059',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 },
    ],
    coupon: 'VALE20',
  };
  const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(5982);
});

test('Deve fazer um pedido com cupom de desconto expirado', async function () {
  const input = {
    cpf: '778.278.412-36',
    zipCode: '13.426.059',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 },
    ],
    coupon: 'VALE20_EXPIRED',
  };
  const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(7400);
});

test('Deve fazer um pedido com cálculo de frete', async function () {
  const input = {
    cpf: '778.278.412-36',
    zipCode: '13.426.059',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 },
    ],
    coupon: 'VALE20_EXPIRED',
  };
  const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.freight).toBe(310);
});

test('Deve fazer um pedido calculando o codigo', async function () {
  const input = {
    cpf: '778.278.412-36',
    zipCode: '13.426.059',
    items: [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 1 },
      { id: '3', quantity: 3 },
    ],
    coupon: 'VALE20_EXPIRED',
    issueDate: new Date('2021-10-10'),
  };
  const orderRepository = repositoryFactory.createOrderRepository();
  await orderRepository.clean();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.code).toBe('202100000001');
});
