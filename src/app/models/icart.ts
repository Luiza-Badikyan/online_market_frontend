import {IProduct} from "./iproduct";

export interface ICart {
  _id: string,
  product: IProduct,
  quantity: number,
}
