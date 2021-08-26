import Coupon from './Coupon';

export default interface CouponRepository {
  getByCode(code: string): Coupon | undefined;
}
