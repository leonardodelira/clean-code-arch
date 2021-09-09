import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/ZipCodeCalculatorAPIMemory';
import PlaceOrder from '../../src/application/PlaceOrder';
import { ItemRepositoryPostgres } from '../../src/infra/repository/database/ItemRepositoryPostgres';
import { PgPromiseDatabase } from '../../src/infra/database/PgPromiseDatabase';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';

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
  const itemRepository = new ItemRepositoryPostgres(PgPromiseDatabase.getInstance());
  const couponRepository = new CouponRepositoryDatabase(PgPromiseDatabase.getInstance());
  const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
  await orderRepository.clean();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(), zipCodeCalculator);
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
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(), zipCodeCalculator);
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
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(), zipCodeCalculator);
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
  const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
  await orderRepository.clean();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(), zipCodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.code).toBe('202100000001');
});
