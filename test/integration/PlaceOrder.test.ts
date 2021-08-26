import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import ZipCodeCalculatorAPIMemory from '../../src/infra/repository/memory/ZipCodeCalculatorAPIMemory';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import PlaceOrder from '../../src/application/PlaceOrder';

test('Deve fazer um pedido', function () {
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
  const itemRepository = new ItemRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const zipCodeCalculator = new ZipCodeCalculatorAPIMemory();
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipCodeCalculator);
  const output = placeOrder.execute(input);
  expect(output.total).toBe(5982);
});

test('Deve fazer um pedido com cupom de desconto expirado', function () {
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
  const output = placeOrder.execute(input);
  expect(output.total).toBe(7400);
});

test('Deve fazer um pedido com cálculo de frete', function () {
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
  const output = placeOrder.execute(input);
  expect(output.freight).toBe(310);
});
