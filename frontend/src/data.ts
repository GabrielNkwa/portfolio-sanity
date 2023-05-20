import { Product } from './types/Product';

export const sampleProducts: Product[] = [
  {
    name: 'Nike Shirt',
    slug: 'nike-shirt',
    image: '../images/d1.png',
    price: 120,
    countInStock: 10,
    category: 'Category 1',
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description: 'Item 1',
  },
  {
    name: 'Adidas Shirt',
    slug: 'adidas-shirt',
    image: '../images/d2.png',
    price: 100,
    countInStock: 20,
    category: 'category 1',
    brand: 'Adidas',
    rating: 4.0,
    numReviews: 10,
    description: 'Item 2',
  },
  {
    name: 'Lacoste Pants',
    slug: 'lacoste-pants',
    image: '../images/d3.png',
    price: 120,
    countInStock: 10,
    category: 'Category 2',
    brand: 'Lacoste',
    rating: 4.8,
    numReviews: 17,
    description: 'Item 3',
  },
];