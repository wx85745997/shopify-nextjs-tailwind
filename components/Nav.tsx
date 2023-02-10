import Link from 'next/link'

export default function Nav() {
    return (
        <header className="border-b sticky top-0 z-20 bg-white">
            <div className="flex items-center justify-between max-x-6xl pt-4 pb-4 mx-auto lg:max-w-screen-xl">
                <Link className="cursor-pointer" href="/" passHref>
                    <span className="text-lg pt-1 font-blod">Shopify + Next.js</span>
                </Link>
                <a href="text-md font-blod cursor-pointer">Cart</a>
            </div>
        </header>
    )
}
