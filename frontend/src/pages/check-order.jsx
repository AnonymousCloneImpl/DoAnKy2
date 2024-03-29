import React, { useState, useEffect } from 'react';
import Link from "next/link";

const CheckOrder = () => {
  const [searchPhone, setSearchPhone] = useState('');
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [otp, setOTP] = useState('');
  const [otpSent, setOTPSent] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [resetTime, setResetTime] = useState(10);

  const handleSearch = () => {
    if (!validPhoneNumber(searchPhone)) {
      alert('invalid phone number !');
      return;
    }

    if (!searchPhone) {
      alert('Please enter your phone number !');
      return;
    }
    setOTPSent(true);
    setWaiting(true);
  };

  const fetchOrders = () => {
    fetch(`${process.env.DOMAIN}/check-order?q=${searchPhone}`)
      .then(response => response.json())
      .then(data => {
        if (data.data != null && data.data != undefined && data.data != "") {
          setShowTable(true);
          setData(data);
        } else {
          alert(`Can't find order with phone number = ${searchPhone}`)
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching data.');
      });
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleOTPSubmit = () => {
    if (otp === '123456') {
      fetchOrders();
    } else {
      alert('Invalid OTP !');
    }
  };

  useEffect(() => {
    let interval;
    if (waiting) {
      interval = setInterval(() => {
        setResetTime(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [waiting]);

  useEffect(() => {
    if (resetTime === 0) {
      setWaiting(false);
      setResetTime(10);
    }
  }, [resetTime]);

  const handleReset = () => {
    setSearchPhone('');
    setData([]);
    setShowTable(false);
    setOTP('');
    setOTPSent(false);
    setWaiting(false);
    setResetTime(10);
  };

  const validPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(\+?84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/;
    return phoneNumberRegex.test(phoneNumber) && phoneNumber.length <= 10 && phoneNumber.length >= 9;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!otpSent) {
        handleSearch();
      } else {
        handleOTPSubmit();
      }
    }
  };

  return (
    <div className='check-order-wrapper'>
      {!otpSent ? (
        <div className="main-search">
          <h1 className='flex text-xl font-bold justify-center my-10 uppercase'>Search by your phone number</h1>
          <div className="flex justify-center">
            <input
              type="text"
              className="block w-1/5 px-4 py-2 bg-white border rounded-md focus:outline-none"
              placeholder="Enter your phone number..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="px-4 text-white bg-red-600 rounded-md uppercase" onClick={handleSearch}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="main-search">
          <h1 className='flex text-xl font-bold justify-center my-10 uppercase'>Enter OTP to Check Order</h1>
          <div className="flex justify-center">
            <input
              type="text"
              className="block w-1/5 px-4 py-2 bg-white border rounded-md focus:outline-none"
              placeholder="Enter OTP..."
              value={otp}
              onChange={handleOTPChange}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="px-4 text-white bg-red-600 rounded-md uppercase" onClick={handleOTPSubmit}>
              Submit OTP
            </button>
          </div>
        </div>
      )}

      {waiting && (
        <div className="text-center mt-4">
          <p>Please wait {resetTime} seconds before resetting</p>
        </div>
      )}

      {!waiting && (
        <div className="text-center mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}

      {showTable && (
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
                        {console.log(item)}
                        {item.orderItemDtoList.map((p, index) => (
                          <p className='text-sky-700' key={index}> -
                            <Link href={`/${p.productType.toLowerCase()}/${p.productName.toLowerCase().replace(/ /g, '-')}`} className="font-bold text-base">
                              {p.productName}
                            </Link>
                          </p>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {item.orderItemDtoList.map((p, index) => (
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
      )}

    </div>
  );
};

export default CheckOrder;
