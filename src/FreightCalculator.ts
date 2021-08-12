import { Item } from './Item';

export class FreightCalculator {
  static calculate(distance: number, item: Item) {
    return distance * item.getVolume() * (item.getDensity() / 100);
  }
}
