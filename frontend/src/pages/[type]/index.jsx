// Import các thư viện và components cần thiết
import React from 'react';
import ProductsPage from "@/components/products/ProductsPage";
import fetcher from "@/utils/fetchAPI";

// Component DynamicProductTypePage
const DynamicProductTypePage = ({ pageData, topSellerData }) => {
    return <ProductsPage pageData={pageData} topSellerData={topSellerData} />;
};

// Hàm getServerSideProps
export async function getServerSideProps(context) {
    try {
        const { type } = context.query;

        const productData = await fetcher(`${process.env.DOMAIN}/products/${type}`);
        const topSellerData = await fetcher(`${process.env.DOMAIN}/products/top-seller?type=${type}&limit=5`);
        console.log(topSellerData)
        return {
            props: {
                pageData: productData,
                topSellerData: topSellerData,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return {
            props: {
                pageData: null,
                topSellerData: null,
            },
        };
    }
}

export default DynamicProductTypePage;
