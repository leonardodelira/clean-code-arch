import { Item } from './Item';
import ItemRepository from './ItemRepository';

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];

  constructor() {
    this.items = [
      new Item('1', 'Guitarra', 1000, 100, 50, 15, 3),
      new Item('2', 'Amplificador', 5000, 50, 50, 50, 22),
      new Item('3', 'Cabo', 30, 10, 10, 10, 1),
    ];
  }

  getById(id: string): Item | undefined {
    return this.items.find((item) => item.id === id);
  }
}
