// 'use client'
//
// import React, { useState, useEffect, useRef } from 'react';
//
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faCaretUp, faCaretDown, faStar, faStarHalfStroke, faCircleCheck, faCartShopping, faCreditCard, faBoxArchive, faShieldCat, faRotate } from '@fortawesome/free-solid-svg-icons';
// import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
// import useSWR from 'swr';
// import fetcher from "@/utils/fetchAPI";
// import {useRouter} from "next/router";
//
// const Index = () => {
//     const [mainImg, setMainImg] = useState('');
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [data, setData] = useState({
//         id: '',
//         producer: '',
//         model: '',
//         name: '',
//         type: '',
//         productDetail: '{}',
//         price: 0,
//         imageList: [],
//         discountPercentage: 0,
//         colorList: [],
//         blog: {
//             contentList : []
//         },
//         purchaseComboItemList: [],
//         similarProductList: []
//     })
//
//     const router = useRouter();
//
//     const { id } = router.query;
//
//     const url = `${process.env.DOMAIN}/products/${id}`;
//
//     const {dataBE, error} = useSWR(url, fetcher);
//
//     if (dataBE) {
//         setData(dataBE);
//     }
//
//     // set main image
//     const subImgItems = data.imageList;
//
//     useEffect(() => {
//         setMainImg(subImgItems[activeIndex]);
//     }, [activeIndex, subImgItems]);
//
//     const handleClick = (index) => {
//         setActiveIndex(index);
//     };
//
//     // set choose product color
//     const activeBtn = (button) => {
//         let buttons = document.querySelectorAll('.pcolor');
//         buttons.forEach(function (btn) {
//             btn.classList.remove('active');
//         });
//         button.classList.add('active');
//     };
//
//     useEffect(() => {
//         const firstButton = document.querySelector('.pcolor');
//         if (firstButton) {
//             firstButton.classList.add('active');
//             activeBtn(firstButton);
//         }
//     }, []);
//
//     // cart notification
//     const [cartNotificationVisible, setCartNotificationVisible] = useState(false);
//
//     const addToCart = () => {
//         setCartNotificationVisible(true);
//
//         setTimeout(() => {
//             setCartNotificationVisible(false);
//         }, 3000);
//     };
//
//     // Set quantity
//     useEffect(() => {
//         const quantityInput = document.querySelector('.quantity-input');
//         const decreaseButton = document.querySelector('.quantity-decrease');
//         const increaseButton = document.querySelector('.quantity-increase');
//
//         decreaseButton.addEventListener('click', function () {
//             decreaseQuantity();
//         });
//
//         increaseButton.addEventListener('click', function () {
//             increaseQuantity();
//         });
//
//         quantityInput.addEventListener('input', function () {
//             limitQuantity();
//         });
//
//         quantityInput.addEventListener('blur', function () {
//             resetIfEmpty();
//         });
//
//         return () => {
//             decreaseButton.removeEventListener('click', decreaseQuantity);
//             increaseButton.removeEventListener('click', increaseQuantity);
//             quantityInput.removeEventListener('input', limitQuantity);
//             quantityInput.removeEventListener('blur', resetIfEmpty);
//         };
//     }, []);
//
//     function decreaseQuantity(e) {
//         if (e) {
//             e.preventDefault();
//             setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
//         }
//     }
//
//     function increaseQuantity(e) {
//         if (e) {
//             e.preventDefault();
//             setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10));
//         }
//     }
//
//     const limitQuantity = (e) => {
//         if (e) {
//             const value = parseInt(e.target.value, 10);
//             setQuantity(Math.min(Math.max(value || 1, 1), 10));
//         }
//     };
//
//     const resetIfEmpty = (e) => {
//         if (e && e.target.value === '') {
//             setQuantity(1);
//         }
//     };
//
//     // set price
//     const formatPrice = (price) => {
//         const formattedPrice = price.toLocaleString('vi-VN', {
//             style: 'currency',
//             currency: 'VND',
//         });
//         return formattedPrice.replace(/[^\d.]/g, '');
//     };
//
//     const discountedPrice = data.price - (data.price * data.discountPercentage / 100);
//
//
//     // Set price combo
//     const [totalPrice, setTotalPrice] = useState(0);
//
//     useEffect(() => {
//         const calculatedTotalPrice = data.purchaseComboItemList.reduce((accumulator, item) => {
//             const discountedPrice = item.product.price - (item.product.price * item.discountPercentage / 100);
//             return accumulator + discountedPrice;
//         }, 0);
//
//         setTotalPrice(calculatedTotalPrice + discountedPrice);
//     }, [data.purchaseComboItemList]);
//
//     const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
//
//     useEffect(() => {
//         const calculatedTotalOriginalPrice = data.purchaseComboItemList.reduce((accumulator, item) => {
//             return accumulator + item.product.price;
//         }, 0);
//
//         setTotalOriginalPrice(calculatedTotalOriginalPrice + data.price);
//     }, [data.purchaseComboItemList]);
//
//     const [expanded, setExpanded] = useState(false);
//
//     const toggleContent = () => {
//         setExpanded(!expanded);
//     };
//
//     // Order form
//     const [isFormVisible, setFormVisible] = useState(false);
//     const formRef = useRef(null);
//
//     const openForm = () => {
//         setFormVisible(true);
//     };
//
//     const closeForm = () => {
//         setFormVisible(false);
//     };
//
//
//     // Place Order
//     const [customerName, setCustomerName] = useState('');
//     const [customerPhone, setCustomerPhone] = useState('');
//     const [customerEmail, setCustomerEmail] = useState('');
//     const [houseAddress, setHouseAddress] = useState('');
//
//     const [provinces, setProvinces] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [wards, setWards] = useState([]);
//     const [selectedProvinceId, setSelectedProvinceId] = useState('');
//     const [selectedDistrictId, setSelectedDistrictId] = useState('');
//     const [selectedWardId, setSelectedWardId] = useState('');
//
//     const [isSuccessNotificationVisible, setSuccessNotificationVisible] = useState(false);
//
//     const handleProvinceChange = (provinceId) => {
//         const selectedProvince = provinces.find((province) => province[0] === provinceId);
//         setSelectedProvinceId(provinceId);
//         setDistricts(selectedProvince[4]);
//     };
//
//     const handleDistrictChange = (districtId) => {
//         const selectedDistrict = districts.find((district) => district[0] === districtId);
//         setSelectedDistrictId(districtId);
//         setWards(selectedDistrict[4]);
//     };
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/address.json');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }
//                 const jsonData = await response.json();
//                 setProvinces(jsonData);
//             } catch (error) {
//                 console.error('Error fetching data', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//
//         const selectedWard = wards.find(w => w[0] === selectedWardId);
//         const selectedDistrict = districts.find(d => d[0] === selectedDistrictId);
//         const selectedProvince = provinces.find(p => p[0] === selectedProvinceId);
//
//         const customerAddress =`${houseAddress}, ${selectedWard ? selectedWard[1] : ''}, ${selectedDistrict ? selectedDistrict[1] : ''}, ${selectedProvince ? selectedProvince[1] : ''}`;
//
//         const orderData = {
//             customerName,
//             customerPhone,
//             customerEmail,
//             customerAddress
//         };
//         console.log('Order Data:', orderData);
//         const url = `${process.env.DOMAIN}/orders/place-order`;
//
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(orderData),
//             });
//
//             if (response.ok) {
//                 closeForm();
//                 setSuccessNotificationVisible(true);
//                 setTimeout(() => {
//                     setSuccessNotificationVisible(false);
//                 }, 1000);
//                 console.log('Order placed successfully');
//             } else {
//                 console.error('Failed to place order');
//             }
//         } catch (error) {
//             console.error('Error sending order request', error);
//         }
//     };
//
//
//     return (
//         <div className="body-wrapper">
//             <div className="url">
//                 <a href="#">Home </a>
//                 <b> &#8250; </b>
//                 <a href="#">Product</a>
//                 <b> &#8250; </b>
//                 <a href="#">Laptop</a>
//             </div>
//
//             <div className="top-line"></div>
//
//             <div className="product-box">
//                 <div className="left-box">
//                     <div className="main-img">
//                         <img src={mainImg} alt="Main Image" />
//                     </div>
//
//                     <div className="sub-img-list">
//                         {subImgItems.map((imgSrc, index) => (
//                             <div
//                                 key={index}
//                                 className={`sub-img-item ${index === activeIndex ? 'active' : ''}`}
//                                 onClick={() => handleClick(index)}
//                             >
//                                 <img src={imgSrc} alt={`Sub-Image ${index + 1}`} />
//                             </div>
//                         ))}
//                     </div>
//
//                     {/* service */}
//                     <div className="service">
//                         <div className="service-item">
//                             <div className="service-item-child">
//                                 <FontAwesomeIcon className="service-icon" icon={faRotate} />
//                                 <div>
//                                     <p>Commitment to 1 for 1 exchange within <b>30 Days</b> for product defects.</p>
//                                     <a href="#">View details &#187;</a>
//                                 </div>
//                             </div>
//                             <div className="service-item-child">
//                                 <FontAwesomeIcon className="service-icon" icon={faShieldCat} />
//                                 <div>
//                                     <p><b>12 Month</b> warranty at manufacturer&apos;s warranty centers</p>
//                                     <a href="#">See warranty address &#187;</a>
//                                 </div>
//                             </div>
//                         </div>
//
//                         <div className="service-line"></div>
//
//                         <div className="service-item">
//                             <FontAwesomeIcon className="service-icon" icon={faBoxArchive} />
//                             <div className="item-combo">
//                                 <b>Product set includes:</b>
//                                 <p>Box, Instructions, SIM card, Case, MicroUSB cable</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* blog list */}
//                     <div className={`product-content ${expanded ? 'expanded' : ''}`}>
//                         <h2>{data.blog.header}</h2>
//                         {data.blog.contentList.map((content, index) => (
//                             <div key={index}>
//                                 <p>{content}</p>
//                                 {data.blog.imageList.length > index && (
//                                     <div className="content-img">
//                                         <img src={data.blog.imageList[index]} alt={`Image ${index}`} />
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                     <button onClick={toggleContent} className="collapse-button">
//                         {expanded ? 'Collapse' : 'Expand'}
//                         <FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} className="collapse-chevron" />
//                     </button>
//                 </div>
//
//                 {/* Right box top */}
//                 <div className="right-box">
//                     <div className="right-box-top">
//                         <div className="pname">{data.name}</div>
//                         <p className="sold">100 Sold</p>
//
//                         <div className="right-box-top-child">
//                             <div className="ratings">
//                                 <FontAwesomeIcon className="star-icon" icon={faStar} />
//                                 <FontAwesomeIcon className="star-icon" icon={faStar} />
//                                 <FontAwesomeIcon className="star-icon" icon={faStar} />
//                                 <FontAwesomeIcon className="star-icon" icon={faStar} />
//                                 <FontAwesomeIcon className="star-icon" icon={faStarHalfStroke} />
//                                 <p>100 Evaluate</p>
//                             </div>
//
//                             <div className="product-price">
//                                 <b>{formatPrice(discountedPrice)}</b>
//                                 <b className="main-money-unit">đ</b>
//                                 <p>{formatPrice(data.price)}</p>
//                                 <p className="main-money-unit">đ</p>
//                             </div>
//
//                             <div className="product-price-ratio">
//                                 <p>{`Down ${data.discountPercentage}%`}</p>
//                             </div>
//
//                             <div className="VAT">
//                                 <div>VAT included</div>
//                                 <div>Warranty 12 Months</div>
//                             </div>
//
//                             <p className="color">Color</p>
//
//                             <div className="product-color">
//                                 <button className="pcolor" onClick={(e) => activeBtn(e.target)}>Black</button>
//                                 <button className="pcolor" onClick={(e) => activeBtn(e.target)}>Red</button>
//                                 <button className="pcolor" onClick={(e) => activeBtn(e.target)}>Pink</button>
//                             </div>
//
//                             <div className="quantity">
//                                 <p>Quantity</p>
//                                 <div className="quantity-control">
//                                     <button className="quantity-decrease" onClick={decreaseQuantity}>-</button>
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         max="10"
//                                         value={quantity}
//                                         onChange={(e) => limitQuantity(e)}
//                                         onBlur={(e) => resetIfEmpty(e)}
//                                         className="quantity-input"
//                                     />
//                                     <button className="quantity-increase" onClick={increaseQuantity}>+</button>
//                                 </div>
//                             </div>
//
//                             <div className="btn-box">
//                                 <button className="cart-btn" onClick={() => addToCart()}>
//                                     <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
//                                 </button>
//                                 <button className="buy-btn" onClick={openForm}>
//                                     <FontAwesomeIcon icon={faCreditCard} /> Buy Now
//                                 </button>
//                             </div>
//
//                             <div className="call-to-order">Call to order now
//                                 <a href="tel:1900 301 297"> 1900 301 297 </a>
//                                 (7:30 - 22:00)
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="right-box-bottom">
//
//                         {/* Detail table */}
//                         <h1 className="detail-name">Thông Tin Chi Tiết</h1>
//
//                         <table className="detail-table">
//                             <tbody>
//                                 {Object.entries(JSON.parse(data.productDetail)).map(([key, value]) => (
//                                     <tr key={key}>
//                                         <td>{key}</td>
//                                         <td>{value}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//
//                         {/* Recommended Accessories */}
//                         <div className="recommended-accessories">
//                             <h1 className="recommended-accessories-header">ATTRACTIVE PROMOTIONS WHEN BUYING TOGETHER</h1>
//
//                             <div className="recommended-accessories-line"></div>
//
//                             <div className="recommend-main-product">
//                                 <div className="recommended-main-img">
//                                     <img src={data.imageList[0]}></img>
//                                 </div>
//                                 <div className="recommended-main-content">
//                                     <h1>{data.name}</h1>
//                                     <div className="accessories-price">
//                                         <b>{formatPrice(discountedPrice)}</b>
//                                         <b className="money-unit">đ</b>
//                                         <p>{formatPrice(data.price)}</p>
//                                         <p className="money-unit">đ</p>
//                                     </div>
//                                     <div className="accessories-price-ratio">
//                                         <p>{`Down ${data.discountPercentage}%`}</p>
//                                     </div>
//                                 </div>
//                             </div>
//
//                             <div className="recommended-accessories-line"></div>
//
//                             <ul className="recommended-accessories-list">
//                                 {data.purchaseComboItemList.map((item) => (
//                                     <li className="recommended-accessories-item" key={item.id}>
//                                         <div className="recommended-accessories-checkbox">
//                                             <input type="checkbox" className="product" defaultChecked />
//                                         </div>
//
//                                         <div className="recommended-accessories-img">
//                                             <img src={item.product.image.split('|')[0]} alt="First Image" />
//                                         </div>
//                                         <div className="recommended-accessories-content">
//                                             <a href={item.product.id}>{item.product.name}</a>
//                                             <div className="accessories-price">
//                                                 <b>{formatPrice(item.product.price - (item.product.price * item.discountPercentage / 100))}</b>
//                                                 <b className="money-unit">đ</b>
//                                                 <p>{formatPrice(item.product.price)}</p>
//                                                 <p className="money-unit">đ</p>
//                                             </div>
//                                             <div className="accessories-price-ratio">
//                                                 <p>{`Down ${item.discountPercentage}%`}</p>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//
//                             <div className="recommended-accessories-line"></div>
//
//                             <div className="total-price">
//                                 <h1>Total Price:</h1>
//                                 <b>{formatPrice(totalPrice)}</b>
//                                 <b className="money-unit">đ</b>
//                                 <p>{formatPrice(totalOriginalPrice)}</p>
//                             </div>
//                             <div className="buy-recommend">
//                                 <button className="buy-recommend-btn" onClick={openForm}>
//                                     <FontAwesomeIcon icon={faCreditCard} /> Buy Now
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//
//
//             {/* Similar products */}
//             <div className="similar-product">
//                 <h1 className="similar-product-header">Similar Products</h1>
//
//                 <div className="similar-product-line"></div>
//                 <ul className="similar-product-list">
//                     {data.similarProductList.map((item) => (
//                         <li key={item.id} className="similar-product-item">
//                             <div className="similar-product-item-content">
//                                 <div className="similar-product-img">
//                                     <img src={item.image.split('|')[0]} alt="First Image"/>
//                                 </div>
//                                 <div className="similar-product-content">
//                                     <a href={item.id}>{item.name}</a>
//                                     <div className="similar-product-price">
//                                         <b>{formatPrice(item.price - (item.price * item.discountPercentage / 100))}</b>
//                                         <b className="money-unit">đ</b>
//                                         <p>{formatPrice(item.price)}</p>
//                                         <p className="money-unit">đ</p>
//                                     </div>
//                                     <div className="similar-product-price-ratio">
//                                         <p>{`Down ${item.discountPercentage}%`}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="similar-product-btn-box">
//                                 <button className="cart-btn" onClick={() => addToCart()}>
//                                     <FontAwesomeIcon icon={faCartShopping}/> Add to Cart
//                                 </button>
//                                 <button className="buy-btn" onClick={openForm}>
//                                     <FontAwesomeIcon icon={faCreditCard}/> Buy Now
//                                 </button>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//
//
//             {/* FORM ORDER */}
//             {isFormVisible && (
//                 <>
//                     <div className="overlay" onClick={closeForm}></div>
//
//                     <div className="popup" ref={formRef}>
//                         <div className="popup-content">
//                             <span className="close-form-btn" onClick={closeForm}>
//                                 <FontAwesomeIcon icon={faCircleXmark} />
//                             </span>
//                             <h1>Order Form</h1>
//
//                             <form className="order-form" onSubmit={handleFormSubmit}>
//                                 <label htmlFor="customerName">Name</label>
//                                 <input type="text"
//                                     value={customerName}
//                                     onChange={(e) => setCustomerName(e.target.value)}
//                                     className="customerName"
//                                     name="customerName"
//                                     placeholder="example: Ngọc Trinh..."
//                                     id="customerName" required>
//                                 </input>
//
//                                 <label htmlFor="customerAddress">Address</label>
//                                 <div className="address-selects">
//                                     <select
//                                         className="province"
//                                         name="province"
//                                         id="province"
//                                         required
//                                         defaultValue=""
//                                         onChange={(e) => handleProvinceChange(e.target.value)}
//                                     >
//                                         <option value="" disabled>--- Province ---</option>
//                                         {provinces.map((province) => (
//                                             <option key={province[0]}
//                                                 value={province[0]}>
//                                                 {province[1]}
//                                             </option>
//                                         ))}
//                                     </select>
//
//                                     <select
//                                         className="district"
//                                         name="district"
//                                         id="district"
//                                         required
//                                         defaultValue=""
//                                         onChange={(e) => handleDistrictChange(e.target.value)}
//                                     >
//                                         <option value="" disabled>--- District ---</option>
//                                         {districts.map((district) => (
//                                             <option key={district[0]}
//                                                 value={district[0]}>
//                                                 {district[1]}
//                                             </option>
//                                         ))}
//                                     </select>
//
//                                     <select
//                                         className="ward"
//                                         name="ward"
//                                         id="ward"
//                                         required
//                                         defaultValue=""
//                                         onChange={(e) => setSelectedWardId(e.target.value)}
//                                     >
//                                         <option value="" disabled>--- Ward ---</option>
//                                         {wards.map((ward) => (
//                                             <option key={ward[0]}
//                                                 value={ward[0]}>
//                                                 {ward[1]}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//
//                                 <label htmlFor="houseAddress">House Address</label>
//                                 <input type="text"
//                                     value={houseAddress}
//                                     onChange={(e) => setHouseAddress(e.target.value)}
//                                     className="customerName"
//                                     name="houseAddress"
//                                     placeholder="Boulevard, alley, house number,..."
//                                     id="houseAddress" required>
//                                 </input>
//
//                                 <label htmlFor="customerPhone">Phone Number</label>
//                                 <div className="phone-wrapper">
//                                     <span className="phone-prefix">+84</span>
//                                     <input type="tel" className="customerPhone"
//                                         value={customerPhone}
//                                         onChange={(e) => setCustomerPhone(e.target.value)}
//                                         name="customerPhone"
//                                         id="customerPhone" required></input>
//                                 </div>
//
//                                 <label htmlFor="customerEmail">Email</label>
//                                 <input type="email" className="customerEmail"
//                                     value={customerEmail}
//                                     onChange={(e) => setCustomerEmail(e.target.value)}
//                                     name="customerEmail"
//                                     placeholder="example@gmail.com"
//                                     id="customerEmail" required></input>
//
//                                 <button type="submit">Confirm Order</button>
//                             </form>
//                         </div>
//                     </div>
//                 </>
//             )}
//
//
//             {/* SUCCESS NOTIFICATION */}
//             {isSuccessNotificationVisible && (
//                 <div className="success-notification">
//                     <FontAwesomeIcon className="success-notification-check" icon={faCheck} />
//                     Order placed successfully !
//                 </div>
//             )}
//
//
//             {/* Cart notification */}
//             <div className="cart-notification" style={{ display: cartNotificationVisible ? 'block' : 'none' }}>
//                 <FontAwesomeIcon className="cart-check" icon={faCircleCheck} />
//                 The product has been added to Cart !
//             </div>
//
//         </div>
//     );
// };
//
// export default Index;
