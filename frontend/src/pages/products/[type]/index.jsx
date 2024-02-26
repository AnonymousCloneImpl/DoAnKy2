import React from 'react';
import ProductsPage from "@/pages/products";

const DynamicPage = ({ pageData }) => {
    return <ProductsPage pageData={pageData} />;
};

export async function getServerSideProps(context) {
    const { type } = context.query;

    const response = await fetch(`${process.env.DOMAIN}/products/${type}`);

    const dataFromBE = await response.json();
    console.log(dataFromBE)
    return {
        props: {
            pageData: dataFromBE,
        },
    };
}

export default DynamicPage;
