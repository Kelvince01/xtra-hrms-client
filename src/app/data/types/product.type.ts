import {PartialRequired} from "./partial-required.type";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  tags: string[];
};


export type ProductDetails = PartialRequired<Product, 'title' | 'price' | 'image'>;
