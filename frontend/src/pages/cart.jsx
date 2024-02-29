import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import FormatPrice from "@/components/FormatPrice";

const CartPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItemList = localStorage.getItem('itemList');

    if (storedItemList) {
      setItems(JSON.parse(storedItemList));
    } else {
      console.log('Undefine itemList');
    }
  }, []);

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    localStorage.setItem('itemList', JSON.stringify(updatedItems));
  };

  const [quantity, setQuantity] = useState(1);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + item.discountedPrice;
    }, 0);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-3xl">Shopping Cart</h1>
              <h2 className="font-semibold text-3xl">{items.length} Items</h2>
            </div>

            <div className="flex mt-10 mb-5 text-xl">
              <h3 className="font-semibold text-600 uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-700 uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-700 uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-700 uppercase w-1/5 text-center">Total</h3>
            </div>

            {items.map((item, index) => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-40">
                    <img className="h-50" src={item.image} />
                  </div>
                  <div key={index} className="flex flex-col justify-between ml-4 flex-grow">
                    <a href={"/" + item.type.toLowerCase() + "/" + item.name.toLowerCase().replace(/ /g, "-")} className="font-bold text-base">
                      {item.name}
                    </a>
                    <span className="text-red-600 text-base font-semibold">{item.inStock} Left In Stock</span>
                    <a href="#" className="font-semibold hover:text-red-500 text-indigo-600 text-lg"
                      onClick={() => removeItem(index)}>
                      <FontAwesomeIcon icon={faTrashCan} /> Remove
                    </a>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path
                      d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>

                  <input className="mx-2 border text-center w-8" type="text" value="1" />

                  <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                    <path
                      d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                  </svg>
                </div>
                <span className="text-center w-1/5 font-semibold text-base">
                  {item.discountedPrice} đ
                </span>
                <span className="text-center w-1/5 font-semibold text-base">
                  {item.discountedPrice * quantity} đ
                </span>
              </div>
            ))}

            <a href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">

              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                <path
                  d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
          </div>

          <div id="summary" className="w-1/3 px-8 py-10">
            <h1 className="font-semibold text-3xl border-b pb-8">Order Summary</h1>

            <h1 className="font-semibold text-3xl my-3">TOTAL COST</h1>
            <h1 className="font-semibold text-2xl text-red-600 mb-7">{calculateTotal()} đ</h1>

            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - 30.000 đ</option>
                <option>Fast shipping - 50.000 đ</option>
              </select>
            </div>

            <div className="py-10">
              <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
              <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
            </div>

            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>

            <div className="border-t mt-8">
              <button
                className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CartPage;
