const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyDate(query: string) {
  const URL = `https://${domain}/api/2023-01/graphql.json`;
  const options: RequestInit = {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((res) => {
      return res.json();
    });
    return data;
  } catch (error) {
    throw new Error("Products not fetched");
  }
}

export async function getProductsInCollection() {
  const query = `#graphql
  {
    collectionByHandle(handle:"frontpage"){
      title
      products(first:25){
        edges{
          node{
            id
            title
            handle
            priceRange{
              minVariantPrice{
                amount
              }
            }
            images(first:5){
              edges{
                node{
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }   
  `;

  const res = await ShopifyDate(query);
  const allProducts = res?.data?.collectionByHandle?.products;
  return allProducts;
}

export async function getAllProducts() {
  const query = `#graphql
  {
    products(first: 100) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }
  `;
  const res = await ShopifyDate(query);
  const slugs = res?.data?.products?.edges ? res.data.products.edges : [];
  return slugs;
}

export async function getProduct(handle: string) {
  const query = `#graphql
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      title
      id
      
    }
  }
`;
  const res = await ShopifyDate(query);
  const product = res?.data?.productByHandle ? res.data.productByHandle : {};
  return product;
}
