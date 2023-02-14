import Head from 'next/head'
import Image from 'next/image'
import { getProductsInCollection } from '@/lib/shopify'
import { Products } from '@/types'
import ProductList from '@/components/ProductList'

export default function Home({ products }: { products: Products }) {
    return (
        <>
            <div className="text-5xl">
                <Head>
                    <title>Home</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"></meta>
                    <meta http-equiv="Content-Type" content="text/html; charset=IOS-8859-1"></meta>
                    <meta name="description" content="home"></meta>
                </Head>
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
