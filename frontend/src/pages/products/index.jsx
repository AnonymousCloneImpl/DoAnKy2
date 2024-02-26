import React from 'react';
import Link from "next/link";

const ProductsPage = ({ pageData }) => {
    return (
        <div>
            <div className="url">
                <Link href="/">Home </Link>
                <b> &#8250; </b>
                <Link href="#">Product</Link>
                <b> &#8250; </b>
                <Link href="/products">{pageData[0].type}</Link>
            </div>
            {pageData.map((product) => (
                <div key={product.id}>
                    <div>
                        {product.name}
                    </div>
                </div>
            ))}
        </div>
    );
};

export async function getServerSideProps(context) {
    const {slug} = context.query;

    const response = await fetch(`${process.env.DOMAIN}/products`);
    const dataFromBE = await response.json();
    return {
        props: {
            pageData: dataFromBE,
        },
    };
}

export default ProductsPage;