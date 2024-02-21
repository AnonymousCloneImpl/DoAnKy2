import ProductComponent from '@/pages/product/productComponent';
import fetcher from '@/utils/fetchAPI';

const ProductDetailPage = ({ productData }) => {
    return <ProductComponent productData={productData} />;
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const url = `${process.env.DOMAIN}/products/${id}`;
    const data = await fetcher(url);

    return {
        props: {
            productData: {
                data,
            },
        },
    };
}

export default ProductDetailPage;