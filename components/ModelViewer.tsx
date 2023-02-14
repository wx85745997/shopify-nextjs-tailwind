import { ModelViewer } from '@shopify/hydrogen-react'
import { Product } from '@/types'
export default function MyProductModel({ product }: { product: Product['node'] }): JSX.Element {
    const firstMediaElement = product.media.edges[0].node
    firstMediaElement.alt = product.title
    // @ts-ignore
    return <ModelViewer class="w-full h-full" data={firstMediaElement} />
}
