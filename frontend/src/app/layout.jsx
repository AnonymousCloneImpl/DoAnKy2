import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/header/header";
import '../styles/global.css';

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className="bg-black">
        <Header/>
        {children}
        </body>
        </html>
    )
}
