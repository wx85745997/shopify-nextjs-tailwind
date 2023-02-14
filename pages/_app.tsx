import Layout from '@/components/Layout'
import ShopProvider from '@/context/shopContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter()
    return (
        <ShopProvider>
            <Layout>
                <Component {...pageProps} key={router.asPath} />
            </Layout>
        </ShopProvider>
    )
}
