import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

import FormatPrice from "@/components/FormatPrice";

const CartPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItemList = localStorage.getItem('itemList');

    if (storedItemList) {
      const loadedItems = JSON.parse(storedItemList).map(item => ({ ...item, quantity: 1 }));
      setItems(loadedItems);
    } else {
      console.log('Undefined itemList');
    }
  }, []);

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    localStorage.setItem('itemList', JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const itemTotal = (item.price - (item.price * item.discountPercentage) / 100) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  const decreaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.max(updatedItems[index].quantity - 1, 1);
    setItems(updatedItems);
    localStorage.setItem('itemList', JSON.stringify(updatedItems));
  };

  const increaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.min(updatedItems[index].quantity + 1, updatedItems[index].stock);
    setItems(updatedItems);
    localStorage.setItem('itemList', JSON.stringify(updatedItems));
  };

  const limitQuantity = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = Math.min(Math.max(value || 1, 1), updatedItems[index].stock);
    setItems(updatedItems);
    localStorage.setItem('itemList', JSON.stringify(updatedItems));
  };

  const resetIfEmpty = (index, value) => {
    const updatedItems = [...items];
    if (value === '' || updatedItems[index].stock.quantity === 0) {
      updatedItems[index].quantity = 1;
      setItems(updatedItems);
      localStorage.setItem('itemList', JSON.stringify(updatedItems));
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-10">
        <div className="bg-white flex justify-between pb-8">
          <h1 className="font-semibold text-3xl">Shopping Cart</h1>
          <h2 className="font-semibold text-3xl">{items.length} Items</h2>
        </div>
        <div className="flex shadow-md">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex border-b text-xl">
              <h3 className="font-semibold text-600 uppercase w-2/5 pb-5">Product Details</h3>
              <h3 className="font-semibold text-right text-700 uppercase w-1/5">Quantity</h3>
              <h3 className="font-semibold text-right text-700 uppercase w-1/5">Price</h3>
              <h3 className="font-semibold text-center text-700 uppercase w-1/5">Total</h3>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-1/3">
                    <img className="h-50" src={item.image} alt={item.name} />
                  </div>
                  <div className="w-2/3 flex flex-col justify-between ml-4 flex-grow">
                    <Link href={`/${item.type.toLowerCase()}/${item.name.toLowerCase().replace(/ /g, '-')}`} className="font-bold text-sm">
                      {item.name}
                    </Link>
                    <b className="cursor-pointer font-semibold hover:text-indigo-600 text-red-600 text-base" onClick={() => removeItem(index)}>
                      <FontAwesomeIcon icon={faTrashCan} /> Remove
                    </b>
                  </div>
                </div>

                <div className="quantity">
                  <div className="quantity-control px-10">
                    <button className="quantity-decrease" onClick={() => decreaseQuantity(index)}><FontAwesomeIcon icon={faMinus} /></button>
                    <input
                      type="number"
                      min="1"
                      max={item.stock}
                      value={item.quantity}
                      onChange={(e) => limitQuantity(index, parseInt(e.target.value, 10))}
                      onBlur={(e) => resetIfEmpty(index, e.target.value)}
                      className="quantity-input"
                    />
                    <button className="quantity-increase" onClick={() => increaseQuantity(index)}><FontAwesomeIcon icon={faPlus} /></button>
                  </div>
                  <div className="text-center text-red-600 font-semibold">{item.stock} Left in Stock</div>
                </div>


                <span className="block text-center w-1/6 font-semibold text-base">
                  <p className="line-through text-gray-400"><FormatPrice price={item.price} /> đ</p>
                  <p><FormatPrice price={item.price - (item.price * item.discountPercentage) / 100} /> đ</p>
                </span>
                <span className="text-center text-red-600 w-1/6 font-semibold text-base">
                  <p><FormatPrice price={(item.price - (item.price * item.discountPercentage) / 100) * item.quantity} /> đ</p>
                </span>
              </div>
            ))}

            <Link href="/" className="flex font-semibold text-indigo-600 text-base mt-10">

              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                <path
                  d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-1/3 px-8 py-10">
            <h1 className="font-semibold text-3xl border-b pb-8">Order Summary</h1>

            <h1 className="font-semibold text-3xl my-3">TOTAL COST</h1>
            <h1 className="font-semibold text-2xl text-red-600 mb-7"><FormatPrice price={calculateTotal()} /> đ</h1>

            <div>
              <label htmlFor="shipping" className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - 30.000 đ</option>
                <option>Fast shipping - 50.000 đ</option>
              </select>
            </div>

            <div className="border-t mt-8">
              <button
                className="bg-indigo-600 font-semibold hover:bg-red-700 py-3 text-sm text-white uppercase w-full">
                Submit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CartPage;
