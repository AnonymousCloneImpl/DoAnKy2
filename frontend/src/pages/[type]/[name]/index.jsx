import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetchAPI";
import CustomErrorPage from "@/pages/error";
import ProductPage from "@/components/products/ProductPage";

const ProductDetailPage = () => {
    const {query} =  useRouter();

    const firstDataUrl = `${process.env.DOMAIN}/products/${query.type}/${query.name}`;

    const {data, isLoading, error} = useSWR(firstDataUrl, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    if (isLoading) return <div>Loading...</div>

    if (error) return <CustomErrorPage />


    return <ProductPage productBE={data} />
};

export default ProductDetailPage;