export type PlaceOrderInput = {
  cpf: string;
  zipCode: string;
  items: any;
  coupon: string;
  issueDate?: Date;
};
