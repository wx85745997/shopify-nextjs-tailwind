import { createContext, useState, useEffect, ReactElement } from 'react'
import { createCheckout, updateCheckout } from '@/lib/shopify'
import { Alloptions } from '@/components/ProductForm'

export type CreateContext = {
    cart: CarItem[]
    carOpen: boolean
    setCarOpen: (carOpen: boolean) => void
    addToCart: (newItem: CarItem) => void
    checkoutUrl: string
    removeCartItem: (itemToRemove: CarItem) => void
}

const CarContext = createContext<CreateContext>({
    cart: [],
    carOpen: false,
    setCarOpen: () => {},
    addToCart: () => {},
    removeCartItem: () => {},
    checkoutUrl: ''
})

export type CarItem = {
    id: string
    variantQuantity: number
    title: string
    price: string
    handle: string
    image: string
    options: Alloptions
    variantTitle: string
    variantPrice: string
}

export default function ShopProvider({ children }: { children: ReactElement }) {
    const [cart, setCart] = useState<CarItem[]>([])
    const [carOpen, setCarOpen] = useState(false)
    const [checkoutId, setCheckoutId] = useState('')
    const [checkoutUrl, setCheckoutUrl] = useState('')
    useEffect(() => {
        if (localStorage.checkout_id) {
            const carObject = JSON.parse(localStorage.checkout_id)
            if (carObject[0].id) {
                setCart([carObject[0]])
            } else if (carObject[0].length > 0) {
                setCart(...([carObject[0]] as const))
            }
            setCheckoutId(carObject[1].id)
            setCheckoutUrl(carObject[1].webUrl)
        }
    }, [])

    async function addToCart(newItem: CarItem) {
        setCarOpen(true)
        if (cart.length === 0) {
            setCart([newItem])
            const checkout = await createCheckout(newItem.id, newItem.variantQuantity)
            setCheckoutId(checkout.id)
            setCheckoutUrl(checkout.webUrl)
            localStorage.setItem('checkout_id', JSON.stringify([newItem, checkout]))
        } else {
            let newCart = [...cart]
            let added = false
            cart.map((item) => {
                if (item.id === newItem.id) {
                    item.variantQuantity++
                    newCart = [...cart]
                    added = true
                }
            })
            if (!added) {
                newCart = [...cart, newItem]
            }
            setCart(newCart)
            const newCheckout = await updateCheckout(checkoutId, newCart)
            localStorage.setItem('checkout_id', JSON.stringify([newCart, newCheckout]))
        }
    }

    async function removeCartItem(itemToRemove: CarItem) {
        const updatedCart = cart.filter((item) => item.id !== itemToRemove.id)
        setCart(updatedCart)
        const newCheckout = await updateCheckout(checkoutId, updatedCart)
        localStorage.setItem('checkout_id', JSON.stringify([updatedCart, newCheckout]))
        if (cart.length === 1) {
            setCarOpen(false)
        }
    }

    return (
        <CarContext.Provider
            value={{
                cart,
                carOpen,
                setCarOpen,
                addToCart,
                checkoutUrl,
                removeCartItem
            }}
        >
            {children}
        </CarContext.Provider>
    )
}

const ShopConsumer = CarContext.Consumer
export { ShopConsumer, CarContext }
