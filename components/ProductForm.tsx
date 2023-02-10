import { Product } from '@/types'
import { formatter } from '@/utils/helpers'
import { useState, useContext } from 'react'
import ProductOptions from './ProductOptions'

type Alloptions = {
    [key: string]: string
}

export default function ProductForm({ product }: { product: Product['node'] }) {
    const allVariantOptions = product.variants.edges?.map((variant) => {
        const alloptions: Alloptions = {}
        variant.node.selectedOptions.map((item: { name: string; value: string }) => {
            alloptions[item.name] = item.value
        })
        return {
            id: variant.node.id,
            title: product.title,
            handle: product.handle,
            image: variant.node.image?.url,
            options: alloptions,
            variantTitle: variant.node.title,
            variantPrice: variant.node.price.amount,
            variantQuantity: 1
        }
    })
    const defaultValues: Alloptions = {}
    product.options.map((item) => {
        defaultValues[item.name] = item.values[0]
    })
    const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
    const [selectedOptions, setSelectedOptions] = useState(defaultValues)
    function setOptions(name: string, value: string) {
        setSelectedOptions((prevState) => ({ ...prevState, [name]: value }))
    }

    return (
        <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w1/3">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <span className="pd-6">
                {formatter.format(+product.variants.edges[0].node.price.amount)}{' '}
            </span>
            {product.options.map(({ name, values }) => {
                return (
                    <ProductOptions
                        key={`key-${name}`}
                        name={name}
                        values={values}
                        selectedOptions={selectedOptions}
                        setOptions={setOptions}
                    />
                )
            })}
            <button className="bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800">
                Add To Card
            </button>
        </div>
    )
}
