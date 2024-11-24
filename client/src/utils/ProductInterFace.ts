export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
}

export interface Review {
  user: User;
  rating: number;
  comment: string;
  _id: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  quantity: number;
  isFeatured: boolean;
  reviews: Review[];
}
