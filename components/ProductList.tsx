import { Products } from '@/types'
import ProductCard from './ProductCard'

const ProductList = ({ products }: { products: Products }) => {
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto pt-16 pb-4  sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-extra bold text-gray-900 mb-5">Products</h2>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-clos-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product.node.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList
