import { Product } from '@/types'
import Image from 'next/image'
import ProductForm from './ProductForm'
import { Swiper, SwiperSlide, SwiperSlideProps } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import MyProductModel from './ModelViewer'

export default function ProductPageContent({ product }: { product: Product['node'] }) {
    const images: React.ReactElement<SwiperSlideProps>[] = []

    product.images.edges.map((image, i) => {
        if (i == 0) {
            images.push(
                <SwiperSlide key={`slide-${i}`}>
                    <MyProductModel product={product} />
                </SwiperSlide>
            )
        } else {
            images.push(
                <SwiperSlide key={`slide-${i}`}>
                    <Image
                        className="fill-inherit object-cover"
                        src={image.node.url}
                        alt={image.node.altText}
                        fill
                    ></Image>
                </SwiperSlide>
            )
        }
    })

    SwiperCore.use([Navigation, Pagination])
    return (
        <div
            className="flex flex-col justify-center items-center space-y-8 md:flex-row
        md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto"
        >
            <div className="w-full max-w-md border bg-white  rounded-2xl overflow-hidden shadow-lg md:w-1/2">
                <div className="relative h-96 w-full">
                    <Swiper
                        style={
                            {
                                '--swiper-navigation-color': '#000',
                                '--swiper-pagination-color': '#000'
                            } as React.CSSProperties
                        }
                        className="h-96 rounded-2xl swiper-no-swiping"
                        navigation
                        pagination={{ clickable: true }}
                    >
                        {images}
                    </Swiper>
                </div>
            </div>
            <ProductForm product={product} />
        </div>
    )
}
