import React from 'react';

const ProductsPage = ({ pageData }) => {
    return (
        <div>
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
    const { slug } = context.query;

    const response = await fetch(`${process.env.DOMAIN}/products`);
    const dataFromBE = await response.json();
    return {
        props: {
            pageData: dataFromBE,
        },
    };
}

export default ProductsPage;