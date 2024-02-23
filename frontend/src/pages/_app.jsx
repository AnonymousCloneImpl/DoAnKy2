import '@/styles/global.css';
import "@/styles/header.css";
import "@/styles/slider.css"
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '../components/layout';
export default function MyApp({ Component, pageProps }) {
    return <Layout>
            <Component {...pageProps} />
        </Layout>
}