import { getAllProducts, getProduct } from '@/lib/shopify'
import { getProductParams, Product } from '@/types'
import ProductPageContent from '@/components/ProductPageContent'

export default function ProductPage({ product }: { product: Product['node'] }) {
    return (
        <div className="min-h-screen py-12 sm:pt-20">
            <ProductPageContent product={product} />
        </div>
    )
}

export async function getStaticPaths() {
    const allProduct = await getAllProducts()
    const paths = allProduct.map((item: Product) => {
        const product = item.node.handle
        return {
            params: {
                product
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: getProductParams) {
    const product = await getProduct(params.product)
    return {
        props: {
            product
        }
    }
}
