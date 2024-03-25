import React, { useState, useEffect } from 'react';
import Link from "next/link";

const CheckOrder = () => {
  const [searchPhone, setSearchPhone] = useState('');
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    fetch(`${process.env.DOMAIN}/check-order?q=${searchPhone}`)
      .then(response => response.json())
      .then(data => {
        if (data.data != null && data.data != undefined && data.data != "") {
          setData(data);
          console.log(data);
        } else {
          setErrorMessage(`Can't find order with phone number = ${searchPhone}`);
          alert(errorMessage)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('An error occurred while fetching data.');
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div>
      <div className="main-search">
        <h1 className='flex text-xl font-bold justify-center my-10 uppercase'>Search by your phone number</h1>
        <div className="flex justify-center">
          <input
            type="text"
            className="block w-1/5 px-4 py-2 bg-white border rounded-md focus:outline-none"
            placeholder="Search..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button type="submit" className="px-4 text-white bg-red-600 rounded-md uppercase" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <section className="container mx-auto p-10 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xl font-bold tracking-wide text-left text-gray-900 bg-gray-300 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">ORDER CODE</th>
                  <th className="px-4 py-3">PRODUCT</th>
                  <th className="px-4 py-3">QUANTITY</th>
                  <th className="px-4 py-3">TOTAL PRICE</th>
                  <th className="px-4 py-3">STATUS</th>
                  <th className="px-4 py-3">DATE</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {Array.isArray(data.data) && data.data.map((item, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="px-4 py-3 border text-ms">
                      <div>
                        <p className="font-semibold text-black">{item.orderCode}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {item.orderItemList.map((p, index) => (
                        <p className='text-sky-700' key={index}> -
                          <Link href={`/${p.product.type.toLowerCase()}/${p.product.name.toLowerCase().replace(/ /g, '-')}`} className="font-bold text-base">
                            {p.product.name}
                          </Link>
                        </p>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">
                      {item.orderItemList.map((p, index) => (
                        <p key={index}>{p.quantity}</p>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{item.totalPrice}</td>
                    <td className="px-4 py-3 text-ms border">
                      <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-gray-100 rounded-sm"> {item.status} </span>
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> PREPARING </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-ms border">{item.orderDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CheckOrder;
