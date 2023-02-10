import Nav from './Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Nav />
            <div className="flex flex-col justify-between min-h-screen">
                <main>{children}</main>
            </div>
            <footer>Footer</footer>
        </div>
    )
}
