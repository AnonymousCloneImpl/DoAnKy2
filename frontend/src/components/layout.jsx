import Header from "@/components/header/header";
export default function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="pt-38">{children}</main>
        </>
    )
}