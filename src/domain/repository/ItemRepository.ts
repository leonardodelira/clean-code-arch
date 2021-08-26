import { Item } from '../entity/Item';

export default interface ItemRepository {
  getById(id: string): Item | undefined;
}
