import ZipCodeCalculatorAPIMemory from '../../src/infra/gateway/ZipCodeCalculatorAPIMemory';

test('Deve calcular a distancia do cep', function () {
  const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
  const distance = zipCodeCalculatorAPI.calculate('13426-059', '13426-058');
  expect(distance).toBe(1000);
});
