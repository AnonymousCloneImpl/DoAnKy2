import React from 'react';
import ProductsPage from "@/components/products/ProductsPage";

const DynamicProductTypePage = ({ pageData }) => {
    return <ProductsPage pageData={pageData} />;
};

export async function getServerSideProps(context) {

    const { type } = context.query;

    const response = await fetch(`${process.env.DOMAIN}/products/${type}`);

    const dataFromBE = await response.json();
  
    return {
        props: {
            pageData: dataFromBE,
        },
    };
}

export default DynamicProductTypePage;
