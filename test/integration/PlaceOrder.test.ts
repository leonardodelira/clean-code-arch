import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/ZipCodeCalculatorAPIMemory';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import PlaceOrder from '../../src/application/PlaceOrder';
import { ItemRepositoryPostgres } from '../../src/infra/repository/database/ItemRepositoryPostgres';
import { PgPromiseDatabase } from '../../src/infra/database/PgPromiseDatabase';

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
  const itemRepository = new ItemRepositoryPostgres(new PgPromiseDatabase());
  const couponRepository = new CouponRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipCodeCalculator);
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
  const itemRepository = new ItemRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipCodeCalculator);
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
  const itemRepository = new ItemRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipCodeCalculator);
  const output = await placeOrder.execute(input);
  expect(output.freight).toBe(310);
});
