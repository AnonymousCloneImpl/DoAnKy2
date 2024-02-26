import React from 'react';

const ProductDetail = ({ product }) => {
    console.log(product)
    return (
        <div>
            <h1>Product Detail</h1>
            <p>{product.name}</p>
        </div>
    );
};

export default ProductDetail;
