import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
    if (value === '' || updatedItems[index].stock.quantity === 0) {
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

  // get address from json file
  useEffect(() => {
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
    const phoneNumberRegex = /^[0-9]+$/;
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
          <h1 className="font-semibold text-3xl">Shopping Cart</h1>
          <h2 className="font-semibold text-3xl">{items.length} Items</h2>
        </div>
        <div className="flex shadow-md">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex border-b text-xl">
              <h3 className="font-semibold text-600 uppercase w-1/2 pb-5">Product Details</h3>
              <h3 className="font-semibold text-center text-700 uppercase w-1/5">Quantity</h3>
              <h3 className="font-semibold text-center text-700 uppercase w-1/5">Price</h3>
              <h3 className="font-semibold text-center text-700 uppercase w-1/5">Total</h3>
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
                  <div className="w-1/3 h-12">
                    <img className="h-20" src={item.image} alt={item.name} />
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

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-3xl border-b pb-8">Order Summary</h1>

            <h1 className="font-semibold text-3xl my-3">TOTAL COST</h1>
            <h1 className="font-semibold text-2xl text-red-600 mb-7"><FormatPrice price={totalPrice} /> đ</h1>

            <div>
              <label htmlFor="shipping" className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
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
      {isFormVisible && (
        <>
          <div className="overlay" onClick={closeForm}></div>

          <div className="order-popup" ref={formRef}>
            <div className="popup-content">
              <span className="close-form-btn" onClick={closeForm}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </span>
              <h1>Order Form</h1>

              <form className="order-form" onSubmit={handleFormSubmit}>
                <label htmlFor="customerName">Name</label>
                <input type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="customerName"
                  name="customerName"
                  placeholder="example: Ngọc Trinh..."
                  id="customerName" required>
                </input>

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
                    <option value="" disabled>--- Province ---</option>
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
                    <option value="" disabled>--- District ---</option>
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
                    <option value="" disabled>--- Ward ---</option>
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

                <label htmlFor="customerPhone">Phone Number</label>
                <div className="phone-wrapper">
                  <span className="phone-prefix">+84</span>
                  <input type="tel" className="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    name="customerPhone"
                    id="customerPhone" required>
                  </input>
                </div>

                <label htmlFor="customerEmail">Email</label>
                <input type="email" className="customerEmail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  name="customerEmail"
                  placeholder="example@gmail.com"
                  id="customerEmail" required></input>

                <button type="submit">Confirm Order</button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default CartPage;
