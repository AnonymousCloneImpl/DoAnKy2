import React from 'react';
import {useRouter} from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetchAPI";
import CustomErrorPage from "@/pages/error";
import ProductPage from "@/components/products/ProductPage";

const ProductDetailPage = () => {
    const router = useRouter();

    const pathName = router.asPath;

    const firstDataUrl = `${process.env.DOMAIN}/products${pathName}`;

    const {data, isLoading, error} = useSWR(firstDataUrl, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    if (error) return <CustomErrorPage />

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <ProductPage productBE={data} />
};

export default ProductDetailPage;