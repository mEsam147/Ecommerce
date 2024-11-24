interface Category {
  id: number;
  name: string;
  path: string;
  image: string;
  title: string;
}
export const categories: Category[] = [
  {
    id: 1,
    name: "shoes",
    path: "/shoes",
    image: "/shoes.jpg",
    title: "Step in Style",
  },
  {
    id: 2,
    name: "clothing",
    path: "/clothing",
    image: "/suits.jpg",
    title: "Fashion Forward",
  },
  {
    id: 3,
    name: "accessories",
    path: "/accessories",
    image: "/accessories.jpg",
    title: "Complete Your Look",
  },
  {
    id: 4,
    name: "books",
    path: "/books",
    image: "/books.jpg",
    title: "Dive into Stories",
  },
  {
    id: 5,
    name: "mobiles",
    path: "/mobiles",
    image: "/mobiles.jpg",
    title: "Stay Connected",
  },
  {
    id: 6,
    name: "glasses",
    path: "/glasses",
    image: "/glasses.jpg",
    title: "See Clearly",
  },
];
