import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import TaxTableRepository from '../../domain/repository/TaxTableRepository';
import CouponRepositoryMemory from '../repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../repository/memory/OrderRepositoryMemory';
import TaxTableRepositoryMemory from '../repository/memory/TaxTableRepositoryMemory';

export class MemoryRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory();
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory();
  }
  createTaxTableRepository(): TaxTableRepository {
    return new TaxTableRepositoryMemory();
  }
}
