import '@/styles/global.css';
import "@/styles/header.css";
import '@/styles/product.css';
import '@/styles/homepage.css';
import '@/styles/buildpc.css';
import '@/styles/order.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '../components/layout';
export default function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
