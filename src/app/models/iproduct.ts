import { ICategory } from "./icategory";

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  price: number;
  category: ICategory;
}
