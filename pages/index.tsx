import Head from 'next/head'
import Image from 'next/image'
import { getProductsInCollection } from '@/lib/shopify'
import { Products } from '@/types'
import ProductList from '@/components/ProductList'

export default function Home({ products }: { products: Products }) {
    return (
        <>
            <div className="text-5xl">
                <ProductList products={products}></ProductList>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const collection = await getProductsInCollection()
    const products = collection.edges
    return {
        props: {
            products
        }
    }
}
