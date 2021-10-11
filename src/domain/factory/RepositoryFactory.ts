import CouponRepository from '../repository/CouponRepository';
import ItemRepository from '../repository/ItemRepository';
import OrderRepository from '../repository/OrderRepository';
import TaxTableRepository from '../repository/TaxTableRepository';

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository;
  createCouponRepository(): CouponRepository;
  createOrderRepository(): OrderRepository;
  createTaxTableRepository(): TaxTableRepository;
}
