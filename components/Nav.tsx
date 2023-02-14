import { CarContext } from '@/context/shopContext'
import Link from 'next/link'
import { useContext } from 'react'
import MiniCart from '@/components/MiniCart'

export default function Nav() {
    const { cart, carOpen, setCarOpen } = useContext(CarContext)

    let carQuantity = 0
    cart.map((item) => {
        return (carQuantity += item?.variantQuantity)
    })

    return (
        <header className="border-b sticky top-0 z-20 bg-white">
            <div className="flex items-center justify-between max-x-6xl pt-4 pb-4 mx-auto lg:max-w-screen-xl">
                <Link className="cursor-pointer" href="/" passHref>
                    <span className="text-lg pt-1 font-blod">Shopify + Next.js</span>
                </Link>
                <a
                    onClick={() => {
                        setCarOpen(!carOpen)
                    }}
                    href="www.google.com"
                    className="text-md font-blod cursor-pointer"
                >
                    Cart({carQuantity})
                </a>
                <MiniCart car={cart} />
            </div>
        </header>
    )
}
