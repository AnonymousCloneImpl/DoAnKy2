import React, {useState} from 'react';

const ProductList = ({ productList }) => {
    if (!productList) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>List of Products</h1>
            <p>{productList.name}</p>
        </div>
    );
};


export default ProductList;
