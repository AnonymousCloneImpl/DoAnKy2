import { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { useRouter } from "next/router";
import OrderForm from '@/components/OrderForm';
import { validEmail, validName, validPhoneNumber } from '@/utils/Validate';

import FormatPrice from "@/components/FormatPrice";
import postMethodFetcher from "@/utils/postMethod";
import Image from "next/image";

const CartPage = () => {

  const [items, setItems] = useState([]);
  const body = useMemo(() => ({
    "cartItemList": []
  }), []);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(items.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, items.length - 1);
  const currentItems = items.slice(startIndex, endIndex + 1);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`mx-1 mb-5 px-3 py-1 rounded-lg border-2 ${currentPage === i ? 'bg-indigo-600 text-white' : 'bg-white text-blue-500'}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  useEffect(() => {
    const storedItemList = localStorage.getItem('itemList');
    if (storedItemList) {
      const loadedItems = JSON.parse(storedItemList).map(item => ({ ...item }));
      loadedItems.map((item) => {
        body.cartItemList.push(
          {
            "productId": item.id,
            "quantity": null
          }
        );
      });
      const getStock = async () => {
        const quantityApi = `${process.env.DOMAIN}/cart`;
        const result = await postMethodFetcher(quantityApi, body);
        for (let i = 0; i < loadedItems.length; i++) {
          for (let j = 0; j < result.cartItemList.length; j++) {
            if (loadedItems[i].id === result.cartItemList[j].productId) {
              loadedItems[i].stock = result.cartItemList[j].quantity;
              break;
            }
          }
        }
        setItems(loadedItems);
      }
      getStock();
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

  }, [body]);

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
    setSelectedDistrictId('');
    setWards([]);
  };

  const handleDistrictChange = (districtId) => {
    const selectedDistrict = districts.find((district) => district[0] === districtId);
    setSelectedDistrictId(districtId);
    setWards(selectedDistrict[4]);
    setSelectedWardId('');
  };

  // Checkbox----------------------------------------------------------------------------------------------
  const [checkedItems, setCheckedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = prevCheckedItems.includes(itemId)
        ? prevCheckedItems.filter((id) => id !== itemId)
        : [...prevCheckedItems, itemId];
      return updatedCheckedItems;
    });
  };

  // Open/Close order form----------------------------------------------------------------------------------------------
  const [isFormVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);
  const [hasSelectedItems, setHasSelectedItems] = useState(false);
  useEffect(() => {
    setHasSelectedItems(checkedItems.length > 0);
  }, [checkedItems]);

  const openForm = () => {
    if (!hasSelectedItems) {
      alert('Please select at least one item before submitting the order.');
    } else {
      setFormVisible(true);
    }
  };

  const closeForm = () => setFormVisible(false);

  // get checked item------------------------------------------------------------------------------------------------
  useEffect(() => {
    const calculatedTotalPrice = items.reduce((accumulator, item) => {
      if (hasSelectedItems && checkedItems.includes(item.id)) {
        return accumulator + (item.price - (item.price * item.discountPercentage) / 100) * item.quantity;
      }
      return accumulator;
    }, 0);

    const finalTotalPrice = hasSelectedItems ? calculatedTotalPrice : calculatedTotalPrice;
    setTotalPrice(finalTotalPrice);
  }, [checkedItems, hasSelectedItems, items]);

  // get shipping method---------------------------------------------------------------------------------------------
  const [shippingMethod, setShippingMethod] = useState('STANDARD_SHIPPING');
  const handleShippingChange = (selectedShipping) => {
    setShippingMethod(selectedShipping);
  };

  // get payment method----------------------------------------------------------------------------------------------
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const handleCheckedPayment = (e) => {
    setPaymentMethod(e.target.value)
  };

  // Place Order----------------------------------------------------------------------------------------------
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const route = useRouter();

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

    // get cart items--------------------------------------------------------------------------------------------------
    const selectedCartItems = items.filter((item) =>
      checkedItems.includes(item.id)
    );

    const orderData = {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      orderItemDtoList: [
        ...selectedCartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      ],
      totalPrice,
      shippingMethod,
      paymentMethod
    };

    const orderUrl = `${process.env.DOMAIN}/orders/place-order`;
    try {
      const data = await postMethodFetcher(orderUrl, orderData)
      if (data !== undefined) {
        const filteredItems = items.filter(item => !checkedItems.includes(item.id));
        localStorage.setItem('itemList', JSON.stringify(filteredItems));

        if (paymentMethod === "COD") {
          route.push("/order/success");
        }

        if (paymentMethod === "PAYPAL") {
          route.push(`/payment?price=${orderData.totalPrice}&orderCode=${data.orderCode}&paymentId=${data.paymentId}`);
        }
      } else alert('Failed to place order');
    } catch (error) {
      console.error('Error sending order request', error);
    }
  };

  return (
    <div style={{ margin: "0 auto" }} className="w-11/12">
      <div className="container mx-auto mt-10">
        <div className="cart-header flex justify-between mb-5 px-5 py-2">
          <h1 className="font-semibold text-white text-2xl uppercase tracking-wide">Shopping Cart</h1>
          <h1 className="font-semibold text-white text-2xl uppercase tracking-wide">{items.length} Items</h1>
        </div>
        <div className="flex shadow-md flex-col md:flex-row">
          <table className="w-3/4 bg-white px-10 py-5 max-lg:w-full">
            <thead className="cart-thead flex text-xl pt-5 font-semibold uppercase text-center">
              <tr className="w-full flex">
                <th className="w-1/12"></th>
                <th className="w-5/12 flex flex-start">Product Details</th>
                <th className="w-3/12 pr-5">Quantity</th>
                <th className="w-1/12 pr-10">Price</th>
                <th className="w-2/12 pr-10">Total</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="flex flex-wrap border-t items-center hover:bg-gray-100 px-6 py-5">
                  <td className="flex items-center w-1/12">
                    <input type="checkbox"
                      className="product scale-150 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600"
                      onChange={() => handleCheckboxChange(item.id)}
                      checked={checkedItems.includes(item.id)}
                    />
                  </td>
                  <td className="flex w-5/12 max-lg:w-11/12">
                    <div className="w-28">
                      <img className="h-20" src={item.image} alt={item.name} />
                    </div>
                    <div className="grid grid-rows-3 ml-4 max-md:grid-rows-1 max-md:grid-cols-3 max-md:w-full">
                      <Link
                        href={`/${item.type.toLowerCase()}/${item.name.toLowerCase().replace(/ /g, '-')}?model=${item.model.toLowerCase().replace(/ /g, '-')}`}
                        className="font-bold text-base row-span-2 max-md:col-span-2 max-md:w-full">
                        {item.name + " " + item.model}
                      </Link>
                      <div className="flex cursor-pointer font-semibold text-red-600 hover:text-red-900 text-md text-center">
                        <b className="max-md:w-full text-right"
                          onClick={() => removeItem(index)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </b>
                        <p onClick={() => removeItem(index)} className="ml-2 max-md:hidden">REMOVE</p>
                      </div>
                    </div>
                  </td>

                  <td className="quantity w-3/12 text-center flex justify-center flex-wrap max-lg:w-full">
                    <div className="quantity-control px-10">
                      <button className="quantity-decrease" onClick={() => decreaseQuantity(index)}>
                        <FontAwesomeIcon icon={faMinus} /></button>
                      <input
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) => limitQuantity(index, parseInt(e.target.value, 10))}
                        onBlur={(e) => resetIfEmpty(index, e.target.value)}
                        className="quantity-input"
                      />
                      <button className="quantity-increase" onClick={() => increaseQuantity(index)}>
                        <FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <div className="text-center text-red-600 font-semibold text-sm uppercase max-md:hidden">
                      {item.stock} Left in Stock
                    </div>
                  </td>

                  <td className="flex text-center font-semibold text-base w-1/12 max-lg:w-6/12">
                    <h1 className='cart-hidden-price'>Price:</h1>
                    <div className="w-full flex justify-center">
                      <FormatPrice price={item.price - (item.price * item.discountPercentage) / 100}
                        type={"discount"} />
                    </div>
                  </td>

                  <td className="flex text-center font-semibold text-base w-2/12 max-lg:w-6/12">
                    <h1 className='cart-hidden-price'>Total:</h1>
                    <div className="w-full flex justify-center">
                      <FormatPrice
                        price={(item.price - (item.price * item.discountPercentage) / 100) * item.quantity}
                        type={"discount"} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div id="summary" className="w-full md:w-1/4 px-8 py-10 bg-gray-100">
            <h1 className="font-semibold text-2xl border-b pb-8">ORDER SUMARY</h1>

            <h1 className="font-semibold text-2xl my-3">TOTAL COST</h1>
            <div className="float-start">
              <FormatPrice price={totalPrice} type={"discount"} />
            </div>

            <div className="border-t mt-20">
              <button
                className="bg-indigo-600 font-semibold hover:bg-red-600 py-3 text-sm text-white uppercase w-full"
                onClick={openForm}> Submit Order
              </button>
            </div>
          </div>
        </div>

        <div>
          <Link href="/" className="flex font-semibold text-indigo-600 text-base uppercase mt-5">
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
              <path
                d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>

      <div className="flex justify-center my-5">
        {renderPagination()}
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
              <Image
                src='https://www.teksavvy.com/wp-content/themes/teksavvy/assets/svg/teksavvy-logo.svg'
                alt=""
                width={250}
                height={100}
                className="order-logo"
              />
              <OrderForm
                provinces={provinces}
                districts={districts}
                wards={wards}
                handleProvinceChange={handleProvinceChange}
                handleDistrictChange={handleDistrictChange}
                setSelectedWardId={setSelectedWardId}
                shippingMethod={shippingMethod}
                handleShippingChange={handleShippingChange}
                paymentMethod={paymentMethod}
                handleCheckedPayment={handleCheckedPayment}
                handleFormSubmit={handleFormSubmit}
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerEmail={customerEmail}
                setCustomerEmail={setCustomerEmail}
                houseAddress={houseAddress}
                setHouseAddress={setHouseAddress}
                customerPhone={customerPhone}
                setCustomerPhone={setCustomerPhone}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </>
      )}

    </div>
  )
};

export default CartPage;
