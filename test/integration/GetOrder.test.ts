import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/ZipCodeCalculatorAPIMemory';
import PlaceOrder from '../../src/application/PlaceOrder';
import { PgPromiseDatabase } from '../../src/infra/database/PgPromiseDatabase';
import GetOrder from '../../src/application/GetOrder';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';
import { DatabaseRepositoryFactory } from '../../src/infra/factory/DatabaseRepositoryFactory';

test('Deve consultar um pedido', async function () {
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
  const orderRepository = new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
  await orderRepository.clean();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(new DatabaseRepositoryFactory(), zipCodeCalculator);
  const output = await placeOrder.execute(input);
  const getOrder = new GetOrder(new DatabaseRepositoryFactory());
  const getOrderOutput = await getOrder.execute(output.code);
  expect(getOrderOutput.total).toBe(5982);
});
