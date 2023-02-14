import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-between">
            <Nav />
            <div className="flex flex-col justify-between">
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    )
}
