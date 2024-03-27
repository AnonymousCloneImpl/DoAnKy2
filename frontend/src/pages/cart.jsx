import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

import FormatPrice from "@/components/FormatPrice";

const postMethodFetcher = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

const CartPage = () => {
  const [items, setItems] = useState([]);
  let body = {
    "cartItemDtoList": []
  }

  useEffect(() => {
    const storedItemList = localStorage.getItem('itemList');
    if (storedItemList) {
      const loadedItems = JSON.parse(storedItemList).map(item => ({ ...item }));
      setItems(loadedItems);
    } else {
      console.log('Undefined itemList');
    }
    const fetchData = async () => {
      try {
        const response = await fetch('/address.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setProvinces(jsonData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();

  }, []);

  const quantityApi = `${process.env.DOMAIN}/cart`;

  const sendPostRequest = async () => {
    const result = await postMethodFetcher(quantityApi, body);

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < result.cartItemDtoList.length; j++) {
        if (items[i].id === result.cartItemDtoList[j].productId) {
          items[i].stock = result.cartItemDtoList[j].quantity;
          console.log(items[i])
          break;
        }
      }
    }
  }

  if (items !== [] && items !== undefined) {
    let arr = items.map(item => item.id);
    arr.map((item) => {
      body.cartItemDtoList.push(
        {
          "productId": item,
          "quantity": null
        }
      );
    });
    sendPostRequest();
  }

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    localStorage.setItem('itemList', JSON.stringify(updatedItems));
  };

  // Quantity----------------------------------------------------------------------------------------------
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
    if (value === '' || updatedItems[index].stock === 0) {
      updatedItems[index].quantity = 1;
      setItems(updatedItems);
      localStorage.setItem('itemList', JSON.stringify(updatedItems));
    }
  };

  // Open/Close order form----------------------------------------------------------------------------------------------
  const [isFormVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);

  const openForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  // Select option address----------------------------------------------------------------------------------------------
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedWardId, setSelectedWardId] = useState('');

  const handleProvinceChange = (provinceId) => {
    const selectedProvince = provinces.find((province) => province[0] === provinceId);
    setSelectedProvinceId(provinceId);
    setDistricts(selectedProvince[4]);
  };

  const handleDistrictChange = (districtId) => {
    const selectedDistrict = districts.find((district) => district[0] === districtId);
    setSelectedDistrictId(districtId);
    setWards(selectedDistrict[4]);
  };

  // Checkbox----------------------------------------------------------------------------------------------
  const [checkedItems, setCheckedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = prevCheckedItems.includes(itemId)
        ? prevCheckedItems.filter((id) => id !== itemId)
        : [...prevCheckedItems, itemId];
      console.log("Updated Checked Items:", updatedCheckedItems);
      return updatedCheckedItems;
    });
  };

  const [shippingCost, setShippingCost] = useState(50000);
  const handleShippingChange = (event) => {
    const selectedShipping = event.target.value;
    const costMapping = {
      'Standard shipping - 50.000 đ': 50000,
      'Fast shipping - 100.000 đ': 100000,
    };
    setShippingCost(costMapping[selectedShipping]);
  };

  useEffect(() => {
    const isItemChecked = checkedItems.length > 0;
    const calculatedTotalPrice = items.reduce((accumulator, item) => {
      if (isItemChecked && checkedItems.includes(item.id)) {
        return accumulator + (item.price - (item.price * item.discountPercentage) / 100) * item.quantity;
      }
      return accumulator;
    }, 0);

    const finalTotalPrice = isItemChecked ? calculatedTotalPrice + shippingCost : calculatedTotalPrice;
    setTotalPrice(finalTotalPrice);
  }, [items, checkedItems, shippingCost]);

  // place order----------------------------------------------------------------------------------------------
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [houseAddress, setHouseAddress] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const selectedWard = wards.find(w => w[0] === selectedWardId);
    const selectedDistrict = districts.find(d => d[0] === selectedDistrictId);
    const selectedProvince = provinces.find(p => p[0] === selectedProvinceId);

    const shippingAddress = `${houseAddress}, ${selectedWard ? selectedWard[1] : ''}, ${selectedDistrict ? selectedDistrict[1] : ''}, ${selectedProvince ? selectedProvince[1] : ''}`;

    if (!validName(customerName)) {
      alert('Please enter a valid name');
      return;
    }

    if (!validPhoneNumber(customerPhone)) {
      alert('Please enter a valid phone number');
      return;
    }

    if (!validEmail(customerEmail)) {
      alert('Please enter a valid email');
      return;
    }

    // get combo items
    const selectedCartItem = items.filter((item) =>
      checkedItems.includes(item.id)
    );

    const orderData = {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      orderItemDtoList: [
        ...selectedCartItem.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      ],
      totalPrice
    };
    const url = `${process.env.DOMAIN}/orders/place-order`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        closeForm();
        alert("Order placed successfully");

        for (let i = 0; i < checkedItems.length; i++) {
          items.splice(i, 1);
        }
        localStorage.setItem('itemList', JSON.stringify(items));

        window.location.reload();
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error sending order request', error);
    }
  };

  // Validate Order
  const validName = (name) => {
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    return nameRegex.test(name);
  };

  const validPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(\+?84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/;
    return phoneNumberRegex.test(phoneNumber) && phoneNumber.length <= 10 && phoneNumber.length >= 9;
  };

  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div style={{ margin: "0 auto" }} className="bg-gray-100 w-11/12">
      <div className="container mx-auto mt-10">
        <div className="bg-white flex justify-between pb-8">
          <h1 className="font-semibold text-3xl uppercase">Shopping Cart</h1>
          <h2 className="font-semibold text-2xl uppercase">{items.length} Items</h2>
        </div>
        <div className="flex shadow-md">
          <div className="w-3/4 bg-white px-10 py-5">
            <div className="flex border-b text-xl text-700 pb-5 font-semibold uppercase">
              <h3 className="w-1/2">Product Details</h3>
              <h3 className="w-1/5 ml-10">Quantity</h3>
              <h3 className="w-1/5 ml-3">Price</h3>
              <h3 className="w-1/5">Total</h3>
            </div>

            {items.map((item, index) => (
              <div key={index} className=" border-b flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex items-center mb-4">
                  <input type="checkbox" className="product scale-125 mr-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600"
                    onChange={() => handleCheckboxChange(item.id)}
                    checked={checkedItems.includes(item.id)}
                  />
                </div>
                <div className="flex w-2/5">
                  <div className="w-1/3">
                    <img className="h-20" src={item.image} alt={item.name} />
                  </div>
                  <div className="w-2/3 flex flex-col justify-between ml-4 flex-grow">
                    <Link href={`/${item.type.toLowerCase()}/${item.name.toLowerCase().replace(/ /g, '-')}`} className="font-bold text-base">
                      {item.name}
                    </Link>
                    <b className="cursor-pointer font-semibold hover:text-indigo-600 text-red-600 text-sm" onClick={() => removeItem(index)}>
                      <FontAwesomeIcon icon={faTrashCan} /> REMOVE
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
                  <div className="text-center text-red-600 font-semibold text-sm uppercase">
                    {item.stock} Left in Stock
                  </div>
                </div>


                <div className="block text-center w-1/6 font-semibold text-base">
                  <FormatPrice price={item.price - (item.price * item.discountPercentage) / 100} type={"discount"} />
                </div>
                <div className="text-center text-red-600 w-1/6 font-semibold text-base">
                  <FormatPrice price={(item.price - (item.price * item.discountPercentage) / 100) * item.quantity} type={"discount"} />
                </div>
              </div>
            ))}

            <Link href="/" className="flex font-semibold text-indigo-600 text-base uppercase mt-10">

              <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
                <path
                  d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">ORDER SUMARY</h1>

            <h1 className="font-semibold text-2xl my-3">TOTAL COST</h1>
            <div className="float-start">
              <FormatPrice price={totalPrice} type={"discount"} />
            </div>

            <div className="mt-20">
              <label htmlFor="shipping" className="font-medium inline-block mb-3 text-sm uppercase">SHIPPING</label>
              <select className="block p-2 text-gray-600 w-full text-sm" onChange={handleShippingChange}>
                <option>Standard shipping - 50.000 đ</option>
                <option>Fast shipping - 100.000 đ</option>
              </select>
            </div>

            <div className="border-t mt-8">
              <button className="bg-indigo-600 font-semibold hover:bg-red-700 py-3 text-sm text-white uppercase w-full"
                onClick={openForm}> Submit Order
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* FORM ORDER */}
      {
        isFormVisible && (
          <>
            <div className="overlay" onClick={closeForm}></div>

            <div className="order-popup" ref={formRef}>
              <div className="popup-content">
                <span className="close-form-btn" onClick={closeForm}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
                <img className='order-logo' src='/favico.png'></img>
                <h1>Order Form</h1>

                <form className="order-form" onSubmit={handleFormSubmit}>
                  <div className='flex justify-between'>
                    <div className='phone-ship'>
                      <label htmlFor="customerName">Name</label>
                      <input type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="customerName"
                        name="customerName"
                        placeholder="example: Ngọc Trinh..."
                        id="customerName" required>
                      </input>
                    </div>
                    <div className='phone-ship'>
                      <label htmlFor="customerEmail">Email</label>
                      <input type="email" className="customerEmail"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        name="customerEmail"
                        placeholder="example@gmail.com"
                        id="customerEmail" required>
                      </input>
                    </div>
                  </div>

                  <label htmlFor="shippingAddress">Address</label>
                  <div className="address-selects">
                    <select
                      className="province"
                      name="province"
                      id="province"
                      required
                      defaultValue=""
                      onChange={(e) => handleProvinceChange(e.target.value)}
                    >
                      <option value="" disabled className='option-css'>--- Province ---</option>
                      {provinces.map((province) => (
                        <option key={province}
                          value={province[0]}>
                          {province[1]}
                        </option>
                      ))}
                    </select>

                    <select
                      className="district"
                      name="district"
                      id="district"
                      required
                      defaultValue=""
                      onChange={(e) => handleDistrictChange(e.target.value)}
                    >
                      <option value="" disabled className='option-css'>--- District ---</option>
                      {districts.map((district) => (
                        <option key={district}
                          value={district[0]}>
                          {district[1]}
                        </option>
                      ))}
                    </select>

                    <select
                      className="ward"
                      name="ward"
                      id="ward"
                      required
                      defaultValue=""
                      onChange={(e) => setSelectedWardId(e.target.value)}
                    >
                      <option value="" disabled className='option-css'>--- Ward ---</option>
                      {wards.map((ward) => (
                        <option key={ward}
                          value={ward[0]}>
                          {ward[1]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <label htmlFor="houseAddress">House Address</label>
                  <input type="text"
                    value={houseAddress}
                    onChange={(e) => setHouseAddress(e.target.value)}
                    className="customerName"
                    name="houseAddress"
                    placeholder="Boulevard, alley, house number,..."
                    id="houseAddress" required>
                  </input>

                  <div>
                    <label htmlFor="customerPhone">Phone Number</label>
                    <div className="phone-wrapper">
                      <input type="tel" className="customerPhone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        name="customerPhone"
                        id="customerPhone" required>
                      </input>
                    </div>
                  </div>

                  <button type="submit">Confirm Order</button>
                </form>
              </div>
            </div>
          </>
        )
      }

    </div >
  )
};

export default CartPage;
