import { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCaretUp, faCaretDown, faStar, faStarHalfStroke, faCircleCheck, faCartShopping, faCreditCard, faBoxArchive, faShieldCat, faRotate } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import Head from "next/head";
import FormatPrice from "@/components/FormatPrice";
import { useRouter } from "next/router";
import postMethodFetcher from "@/utils/postMethod";
import QuantityControl from "@/components/QuantityControl";
import OrderForm from '@/components/OrderForm';
import HandleCartClick from "@/components/HandleCartClick";
import { validEmail, validName, validPhoneNumber } from '@/components/Validate';
import NotificationRender from "@/components/notificationList";

const ProductPage = ({ productBE }) => {
  const [cartNotifications, setCartNotifications] = useState([]);
  const product = productBE;

  // set product image----------------------------------------------------------------------------------------------
  const [mainImg, setMainImg] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const subImgItems = product.imageList;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openImgPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    setMainImg(subImgItems[activeIndex]);
  }, [activeIndex, subImgItems]);

  const handleClick = (index) => {
    setActiveIndex(index);
    if (index === 0) {
      openImgPopup();
    }
  };

  // set choose product configuration----------------------------------------------------------------------------------------------
  const activeBtn = (button) => {
    let buttons = document.querySelectorAll('.pmodel');
    buttons.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  };

  useEffect(() => {
    const firstButton = document.querySelector('.pmodel');
    if (firstButton) {
      firstButton.classList.add('active');
      activeBtn(firstButton);
    }
  }, []);

  // Set quantity----------------------------------------------------------------------------------------------
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  // Set combo----------------------------------------------------------------------------------------------
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkedItems, setCheckedItems] = useState([]);
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = prevCheckedItems.includes(itemId)
        ? prevCheckedItems.filter((id) => id !== itemId)
        : [...prevCheckedItems, itemId];
      return updatedCheckedItems;
    });
  };

  useEffect(() => {
    const calculatedTotalPrice = product.purchaseComboItem.productList.reduce(
      (accumulator, item) => {
        if (checkedItems.includes(item.id)) {
          const discountedPrice =
            item.price - (item.price * item.discountPercentage) / 100;
          return accumulator + discountedPrice;
        }
        return accumulator;
      },
      0
    );
    setTotalPrice(calculatedTotalPrice * 90 / 100 + discountedPrice * quantity);
  }, [checkedItems, discountedPrice, product.purchaseComboItem.productList, quantity]);

  // Open/Close order form----------------------------------------------------------------------------------------------
  const [isFormVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);
  const openForm = () => setFormVisible(true);
  const closeForm = () => setFormVisible(false);

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

  // get address from json file----------------------------------------------------------------------------------------------
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

  // get shipping method
  const [shippingMethod, setShippingMethod] = useState('STANDARD');
  const handleShippingChange = (e) => {
    const selectedShipping = e.target.value;
    const shipMapping = {
      'STANDARD': 'STANDARD_SHIPPING',
      'FAST': 'FAST_SHIPPING',
    };
    setShippingMethod(shipMapping[selectedShipping]);
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

    // get combo items----------------------------------------------------------------------------------------------
    const selectedCombo = product.purchaseComboItem.productList.filter((item) =>
      checkedItems.includes(item.id)
    );

    const orderData = {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      orderItemDtoList: [
        {
          "productId": product.id,
          "quantity": quantity
        },
        ...selectedCombo.map((item) => ({
          productId: item.id,
          quantity: 1,
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
        console.log(paymentMethod)
        if (paymentMethod === "COD") {
          route.push("/order/success");
        }

        if (paymentMethod === "PAYPAL") {
          route.push(`/payment?type=PAYPAL&price=${orderData.totalPrice}&orderCode=${data.orderCode}&paymentId=${data.paymentId}`);
        }

        if (paymentMethod === "VNPAY") {
          route.push(`/payment?type=VNPAY&price=${orderData.totalPrice}&orderCode=${data.orderCode}`);
        }

        if (paymentMethod === "MOMO") {
          route.push(`/payment?type=MOMO&price=${orderData.totalPrice}&orderCode=${data.orderCode}&paymentId=${data.paymentId}`);
        }
      } else alert('Failed to place order');
    } catch (error) {
      console.error('Error sending order request', error);
    }
  };

  // Expand/Collapse blog----------------------------------------------------------------------------------------------
  const [expanded, setExpanded] = useState(false);
  const toggleContent = () => setExpanded(!expanded);

  // Hiden buy btn if sold out----------------------------------------------------------------------------------------------
  const isSoldOut = product.stock.quantity === 0;

  if (!productBE) {
    return (
      <div>Product Data is undefined</div>
    )
  } else {
    return (
      <div className="body-wrapper w-11/12">
        <Head>
          <title>
            {product.name}
          </title>
        </Head>
        <div className="url">
          <Link href="/">Home </Link>
          <b> &#8250; </b>
          <Link href={`/${product.type}`}>{product.type}</Link>
          <b> &#8250; </b>
          <b className="name">{product.name}</b>
        </div>

        <div className="top-line"></div>

        <div className="product-box">
          <div className="left-box">
            <div className="main-img" onClick={openImgPopup}>
              <img src={mainImg} alt="Main Image" />
            </div>

            <div className={`img-popup ${isPopupOpen ? 'open' : ''}`} onClick={closePopup}>
              <img src={mainImg} alt="Main Image" />
            </div>

            <div className="sub-img-list">
              {subImgItems.map((imgSrc, index) => (
                <div
                  key={index}
                  className={`sub-img-item ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => handleClick(index)}
                >
                  <img src={imgSrc} alt={`Sub-Image ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* service */}
            <div className="service">
              <div className="service-item">
                <div className="service-item-child">
                  <FontAwesomeIcon className="service-icon" icon={faRotate} />
                  <div>
                    <p>Commitment to 1 for 1 exchange within <b className='service-b'>30 Days</b> for product defects.</p>
                    <Link href="#">View details &#187;</Link>
                  </div>
                </div>
                <div className="service-item-child">
                  <FontAwesomeIcon className="service-icon" icon={faShieldCat} />
                  <div>
                    <p><b className='service-b'>12 Month</b> warranty at manufacturer&apos;s warranty centers</p>
                    <Link href="#">See warranty address &#187;</Link>
                  </div>
                </div>
              </div>

              <div className="service-line"></div>

              <div className="service-item service-bottom">
                <FontAwesomeIcon className="service-icon" icon={faBoxArchive} />
                <div className="item-combo">
                  <b>Product set includes:</b>
                  <p>Box, Instructions, SIM card, Case, MicroUSB cable</p>
                </div>
              </div>
            </div>

            {/* blog list */}
            <div className={`product-content ${expanded ? 'expanded' : ''}`}>
              <h2>{product.blog.header}</h2>
              {product.blog.contentList.map((content, index) => (
                <div key={index}>
                  <p>{content}</p>
                  {product.blog.imageList.length > index && (
                    <div className="content-img">
                      <img src={product.blog.imageList[index]} alt={`Image ${index}`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={toggleContent} className="collapse-button">
              {expanded ? 'Collapse' : 'Expand'}
              <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} className="collapse-chevron" />
            </button>
          </div>


          <div className="right-box">
            {/* Right box top */}
            <div className="right-box-top">
              <div className="pname">{product.name}</div>
              <p className="sold">{product.stock.sold} Sold</p>

              <div className="right-box-top-child">
                <div className="ratings">
                  <FontAwesomeIcon className="star-icon" icon={faStar} />
                  <FontAwesomeIcon className="star-icon" icon={faStar} />
                  <FontAwesomeIcon className="star-icon" icon={faStar} />
                  <FontAwesomeIcon className="star-icon" icon={faStar} />
                  <FontAwesomeIcon className="star-icon" icon={faStarHalfStroke} />
                  <p>100 Evaluate</p>
                </div>

                <div className="flex my-3 w-2/5">
                  <div className='mr-2'>
                    <FormatPrice price={discountedPrice * quantity} type={"discount"} />
                  </div>
                  <FormatPrice price={product.price * quantity} />
                </div>

                <div className="product-price-ratio">
                  <p>{`Down ${product.discountPercentage}%`}</p>
                </div>

                <div className="VAT">
                  <div>VAT included</div>
                  <div>Warranty 12 Months</div>
                </div>

                <p className="model">Configuration</p>
                <div className="product-model">

                  {product.configurationList.map((item, index) => (
                    <button key={index} className="pmodel" onClick={(e) => activeBtn(e.target)}>{item}</button>
                  ))}
                </div>

                <div className="quantity">
                  <p>Quantity</p>
                  <QuantityControl initialQuantity={1} maxQuantity={productBE.stock.quantity} onChange={handleQuantityChange} />
                </div>
                <div className="left-in-stock">{product.stock.quantity} Left In Stock</div>

                <div className="btn-box">
                  <button className="cart-btn" onClick={() => HandleCartClick({ product, setCartNotifications })}>
                    <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                  </button>
                  <button className={`buy-btn ${isSoldOut ? 'disabled-btn' : ''}`}
                    onClick={openForm}
                    disabled={isSoldOut}>
                    {isSoldOut ? 'Out of Stock' : <><FontAwesomeIcon icon={faCreditCard} /> Buy Now</>}
                  </button>
                </div>

                <div className="call-to-order">Call to order now
                  <Link href="tel:1900 301 297"> 1900 301 297 </Link>
                  (7:30 - 22:00)
                </div>
              </div>
            </div>

            <div className="right-box-bottom">
              {/* Detail table */}
              <h1 className="detail-name">The detail information of product</h1>
              <table className="detail-table">
                <tbody>
                  {Object.entries(JSON.parse(product.details)).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key.toUpperCase()}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Recommended Accessories */}
              <div className="recommended-accessories">
                <h1 className="recommended-accessories-header">ATTRACTIVE PROMOTIONS WHEN BUYING TOGETHER</h1>

                <div className="recommended-accessories-line"></div>

                <div className="recommend-main-product">
                  <div className="recommended-main-img">
                    <img src={product.imageList[0]}></img>
                  </div>
                  <div className="recommended-main-content">
                    <h1>{product.name}</h1>
                    <div className="flex pl-5 w-full">
                      <div className='mr-2'><FormatPrice price={discountedPrice * quantity} type={"discount"} /></div>
                      <FormatPrice price={product.price * quantity} />
                    </div>
                    <div className="accessories-price-ratio">
                      <p>{`Down ${product.discountPercentage}%`}</p>
                    </div>
                    <p className="font-semibold float-start ml-5">Quantity: {quantity}</p>
                  </div>
                </div>

                <div className="recommended-accessories-line"></div>

                <ul className="recommended-accessories-list">
                  {product.purchaseComboItem.productList.map((item, index) => (
                    <li className="recommended-accessories-item" key={index}>
                      <div className="recommended-accessories-checkbox">
                        <input type="checkbox" className="product mr-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:border-gray-600"
                          onChange={() => handleCheckboxChange(item.id)}
                          checked={checkedItems.includes(item.id)} />
                      </div>

                      <div className="recommended-accessories-img">
                        <img src={item.image} alt="First Image" />
                      </div>
                      <div className="recommended-accessories-content">
                        <Link href={"/" + item.type.toLowerCase() + "/" + item.name.toLowerCase().replace(/ /g, "-")}>
                          {item.name}
                        </Link>
                        <div className="flex pl-5 w-full">
                          <div className='mr-2'>
                            <FormatPrice price={item.price - (item.price * item.discountPercentage / 100)} type={"discount"} />
                          </div>
                          <FormatPrice price={item.price} />
                        </div>
                        <div className="accessories-price-ratio">
                          <p>{`Down ${item.discountPercentage}%`}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="recommended-accessories-slogan">
                  Save an additional 10% on all bundled products
                </div>

                <div className="flex justify-center">
                  <div className="w-3/4 flex justify-center items-center">
                    <h1 className="mr-3 font-bold">Total Price:</h1>
                    <div className='mr-3'>
                      <FormatPrice price={totalPrice} type={"discount"} />
                    </div>
                    <FormatPrice price={totalPrice} />
                  </div>
                </div>
                <div className="buy-recommend">
                  <button className="buy-recommend-btn" onClick={openForm}>
                    <FontAwesomeIcon icon={faCreditCard} /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Similar products */}
        <div className="similar-product">
          <h1 className="similar-product-header uppercase">Similar Products</h1>

          <div className="similar-product-line"></div>
          <ul className="similar-product-list">
            {product.similarProductList.map((item, index) => (
              <li key={index} className="similar-product-item">
                <div className="similar-product-item-content">
                  <div className="similar-product-img">
                    <img src={item.image} alt="First Image" />
                  </div>
                  <div className="similar-product-content">
                    <Link href={"/" + item.type.toLowerCase() + "/" + item.name.toLowerCase().replace(/ /g, "-")}>
                      {item.name}
                    </Link>
                    <div className="similar-price flex w-full pl-5 items-center">
                      <div className='mr-2'>
                        <FormatPrice price={item.price - (item.price * item.discountPercentage / 100)} type={"discount"} />
                      </div>
                      <FormatPrice price={item.price} />
                    </div>
                    <div className="similar-product-price-ratio">
                      <p>{`Down ${item.discountPercentage}%`}</p>
                    </div>
                    <div className="similar-product-btn-box">
                      <button className="cart-btn" onClick={() => HandleCartClick({ product: item, setCartNotifications })}>
                        <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
                <img className='order-logo' src='/favico.png'></img>
                <h1>Order Form</h1>
                <OrderForm
                  provinces={provinces}
                  districts={districts}
                  wards={wards}
                  handleProvinceChange={handleProvinceChange}
                  handleDistrictChange={handleDistrictChange}
                  setSelectedWardId={setSelectedWardId}
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
                />
              </div>
            </div>
          </>
        )}

        <NotificationRender cartNotifications={cartNotifications} />

      </div>
    );
  }
};

export default ProductPage;
