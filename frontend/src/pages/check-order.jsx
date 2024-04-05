import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import Link from "next/link";

const CheckOrder = () => {
  const [loading, setLoading] = useState(false);

  const [searchPhone, setSearchPhone] = useState('');
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

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const fetchOrders = async () => {
    setLoading(true);
    await sleep(3000);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOTPChange = (e) => setOTP(e.target.value);

  const handleOTPSubmit = () => {
    (otp === '123456') ? fetchOrders() : alert('Invalid OTP !');
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
      if (e.key === 'Enter') {
        (!otpSent) ? handleSearch() : handleOTPSubmit();
      }
    }
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "WAITING":
        return "text-orange-700";
      case "PREPARING":
        return "text-amber-700";
      case "DELIVERY":
        return "text-cyan-700";
      case "COMPLETE":
        return "text-green-700";
      default:
        return "";
    }
  }

  return (
    <div className='check-order-wrapper'>
      {loading && (
        <div className="loading-spinner"></div>
      )}

      {!loading && (
        <div>
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
            <div className="text-center font-semibold text-red-700 mt-4">
              <p>Please wait {resetTime} seconds before re-enter phone number</p>
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
                        <th className="px-4 py-3 w-40">ORDER CODE</th>
                        <th className="px-4 py-3">PRODUCT</th>
                        <th className="px-4 py-3 w-20">QUANTITY</th>
                        <th className="px-4 py-3 w-40">TOTAL PRICE</th>
                        <th className="px-4 py-3 w-20">PAYMENT</th>
                        <th className="px-4 py-3 w-28">STATUS</th>
                        <th className="px-4 py-3 w-56">DATE</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {Array.isArray(data.data) && data.data
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((item, index) => (
                          <tr key={index} className="text-gray-700">
                            <td className="px-4 py-3 border text-ms">
                              <div>
                                <p className="font-semibold text-black">{item.orderCode}</p>
                              </div>
                            </td>

                            <td className="px-4 py-3 text-ms font-semibold border">
                              {item.orderItemDtoList.map((p, index) => (
                                <p key={index}>
                                  <Link href={`/${p.productType.toLowerCase()}/${p.productName.toLowerCase().replace(/ /g, '-')}`} className="font-bold text-base">
                                    <FontAwesomeIcon icon={faCircle} /> {p.productName}
                                  </Link>
                                </p>
                              ))}
                            </td>

                            <td className="px-4 py-3 text-ms font-semibold border">
                              {item.orderItemDtoList.map((p, index) => (
                                <p key={index}>{p.quantity}</p>
                              ))}
                            </td>

                            <td className="px-4 py-3 text-ms font-semibold border">
                              $ {item.totalPrice}
                            </td>

                            <td className="px-4 py-3 text-ms font-semibold border">
                              {item.paymentMethod}
                            </td>

                            <td className="px-4 py-3 text-ms border">
                              <span className={`px-2 py-1 font-semibold leading-tight ${getStatusColor(item.status)} bg-gray-100 rounded-sm`}>
                                {item.status}
                              </span>
                            </td>

                            <td className="px-4 py-3 font-semibold text-ms border">
                              {formatDate(item.createdAt)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default CheckOrder;
