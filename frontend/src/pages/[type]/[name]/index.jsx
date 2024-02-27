import React from 'react';
import ProductDetail from "@/components/products/ProductDetail";

const ProductDetailPage = ({ productData }) => {
    return <ProductDetail productBE={productData} />
};

export async function getServerSideProps(context) {
    const { type, name } = context.params;

    const response = await fetch(`${process.env.DOMAIN}/products/${type}/${name}`);
    const productData = await response.json();

    console.log(productData)

    return {
        props: {
            productData,
        },
    };
}

export default ProductDetailPage;