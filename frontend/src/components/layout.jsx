import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
export default function Layout({ children }) {
    return (
        <>
            <Header/>
            <div className="pt-38">{children}</div>
        </>
    )
}