import React from 'react';
import ProductDetail from "@/components/products/ProductPage";

const ProductDetailPage = ({ productData }) => {
    return <ProductDetail productBE={productData} />
};

export async function getServerSideProps(context) {
    const { type, name } = context.params;

    const response = await fetch(`${process.env.DOMAIN}/products/${type}/${name}`);
    const productData = await response.json();

    return {
        props: {
            productData,
        },
    };
}

export default ProductDetailPage;