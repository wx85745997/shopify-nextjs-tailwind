const domain = process.env.SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN

async function ShopifyDate(query: string) {
    const URL = `https://${domain}/api/2023-01/graphql.json`
    const options: RequestInit = {
        method: 'POST',
        headers: {
            'X-Shopify-Storefront-Access-Token': storefrontAccessToken as string,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    }

    try {
        const data = await fetch(URL, options).then((res) => {
            return res.json()
        })
        return data
    } catch (error) {
        console.error(error)
        throw new Error('Products not fetched')
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
  `

    const res = await ShopifyDate(query)
    const allProducts = res?.data?.collectionByHandle?.products
    return allProducts
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
  `
    const res = await ShopifyDate(query)
    const slugs = res?.data?.products?.edges ? res.data.products.edges : []
    return slugs
}

export async function getProduct(handle: string) {
    const query = `#graphql
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      options{
        name
        id
        values
      }
      media(first:5){
        edges {
        node {
          ... fieldsForMediaTypes
        }
        }
      }
      variants(first:10){
        edges{
          node{ 
            id
            title
            price{
              amount
            }
            image{
              altText
              url
            }
            selectedOptions{
              name
              value
            }
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }

  fragment fieldsForMediaTypes on Media {
  alt
  mediaContentType
  # preview {
  #   image {
  #     id
  #     altText
  #     url
  #   }
  # }
  #status
  # ... on Video {
  #   id
  #   sources {
  #     format
  #     height
  #     mimeType
  #     url
  #     width
  #   }
  #   originalSource {
  #     format
  #     height
  #     mimeType
  #     url
  #     width
  #   }
  # }
  # ... on ExternalVideo {
  #   id
  #   host
  #   embeddedUrl
  # }
  ... on Model3d {
    sources {
      format
      mimeType
      url
      __typename
    }
    # originalSource {
    #   format
    #   mimeType
    #   url
    # }
  # }
  # ... on MediaImage {
  #   id
  #   image {
  #     altText
  #     url
  #   }
  # }
}
}

`
    const res = await ShopifyDate(query)
    const product = res?.data?.productByHandle ? res.data.productByHandle : {}
    return product
}

export async function createCheckout(id: string, quantity: number) {
    const query = `#graphql
    mutation {
      checkoutCreate(input: {
        lineItems: [{variantId: "${id}", quantity: ${quantity}}]
      }){
        checkout{
          id
          webUrl
        }
      }
    }
`
    const res = await ShopifyDate(query)
    const checkout = res?.data?.checkoutCreate.checkout ? res.data.checkoutCreate.checkout : {}
    return checkout
}

export async function updateCheckout(
    id: string,
    lineItems: { id: string; variantQuantity: number }[]
) {
    const lineItemsObject = lineItems.map((item) => {
        return `{
        variantId:'${item.id}',
        quantity:${item.variantQuantity}
      }`
    })
    const query = `#graphql
    {
      mutation{
        checkoutLineItemsReplace(lineItems:[${lineItemsObject}],checkoutId:"${id}"){
          checkout{
            id
            url
            lineItems(first:25){
              edges{
                node{
                  id
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  `
    const res = await ShopifyDate(query)
    const checkout = res?.data?.checkoutLineItemsReplace?.checkout
        ? res.data.checkoutLineItemsReplace.checkout
        : []
    return checkout
}
