import Layout from '../components/layout'
import '@fortawesome/fontawesome-svg-core/styles.css';
export default function MyApp({ Component }) {
    return (
        <Layout>
            <Component />
        </Layout>
    )
}