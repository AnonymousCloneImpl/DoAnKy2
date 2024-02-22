import ProductComponent from '@/pages/products/productComponent';
import fetcher from '@/utils/fetchAPI';
import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export async function getServerSideProps(context) {
    const { id } = context.params;
    const url = `${process.env.DOMAIN}/products/${id}`;

    try {
        const data = await fetcher(url);
        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                data: null,
                error: "Error fetching data",
            },
        };
    }
}

export default function ProductDetailPage({ data }) {
    return (
        <ProductComponent data={data} />
    );
}
