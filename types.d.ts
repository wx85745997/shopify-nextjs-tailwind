import { type } from "os";

export type Product = {
  node: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    images: {
      edges: [
        {
          node: {
            url: string;
            altText: string;
          };
        }
      ];
    };
  };
};

export type Products = [Product];

export type Collection = {
  edges: [Product];
  title: string;
};

export type getProductParams = {
  params: {
    product: string;
  };
};
