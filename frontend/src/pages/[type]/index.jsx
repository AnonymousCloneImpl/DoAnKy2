import React from 'react';
import ProductsByTypePage from "@/components/products/ProductsByTypePage";
import fetcher from "@/utils/fetchAPI";

const DynamicProductTypePage = ({ pageData, topSellerData }) => {
    return <ProductsByTypePage pageData={pageData} topSellerData={topSellerData} />;
};

export async function getServerSideProps(context) {
    try {
        const { type } = context.query;

        console.log("getServerSideProps is running")

        if (type === "favicon.ico") {
            console.log("Type is favicon.ico. No data fetching needed.");
            return {
                props: {
                    pageData: null,
                    topSellerData: null,
                },
            };
        }

        // Thực hiện fetch dữ liệu cho các trường hợp khác
        const productData = await fetcher(`${process.env.DOMAIN}/products/${type}`);
        const topSellerData = await fetcher(`${process.env.DOMAIN}/products/top-seller?type=${type}&limit=5`);

        console.log(productData)
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
