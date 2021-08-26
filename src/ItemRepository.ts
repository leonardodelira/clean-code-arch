import { Item } from './Item';

export default interface ItemRepository {
  getById(id: string): Item | undefined;
}
