import { type } from 'os'

export type Product = {
    node: {
        options: [
            {
                id: string
                name: string
                values: string[]
            }
        ]
        id: string
        title: string
        handle: string
        variants: {
            edges: [
                {
                    node: {
                        title: string
                        id: string
                        price: {
                            amount: string
                        }
                        image: {
                            url: string
                            altText: string
                        }
                        selectedOptions: [
                            {
                                name: string
                                value: string
                            }
                        ]
                    }
                }
            ]
        }
        priceRange: {
            minVariantPrice: {
                amount: string
            }
        }
        images: {
            edges: [
                {
                    node: {
                        url: string
                        altText: string
                    }
                }
            ]
        }
    }
}

export type Products = [Product]

export type Collection = {
    edges: [Product]
    title: string
}

export type getProductParams = {
    params: {
        product: string
    }
}
