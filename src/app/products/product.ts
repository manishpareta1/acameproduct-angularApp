/* Defines the product entity */
export interface Product {
  id: number;
  productName: string;
  productCode: string;
  category: string;
  tags?: string[];
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}
//This interface is used as custom model class if ther is any exception
//while fetching Product details, for returning product and error message
export interface ProductResolved {
  product: Product;
  error?: any;
}
