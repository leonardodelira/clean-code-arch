import ZipCodeCalculatorAPI from '../../domain/gateway/ZipCodeCalculatorAPI';

export default class ZipCodeCalculatorAPIMemory implements ZipCodeCalculatorAPI {
  calculate(zipCodeA: string, zipCodeB: string): number {
    return 1000;
  }
}
