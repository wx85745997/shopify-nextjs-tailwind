const navigation = [
    { name: 'About Us', href: '#' },
    { name: 'Terms of service', href: '#' }
]

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="flex flex-warp justify-center">
                    {navigation.map((item, i) => (
                        <div className="px-6 py-2" key={i}>
                            <a href="" className="text-gray-500 hover:text-gray-900">
                                {item.name}
                            </a>
                        </div>
                    ))}
                </nav>
                <p className="mt-8 text-center text-gray-800">© 2012-2023 learn shopify theme</p>
            </div>
        </footer>
    )
}
