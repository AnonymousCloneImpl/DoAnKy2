import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faStar, faStarHalfStroke, faPhoneVolume, faCircleCheck, faCartShopping, faCreditCard, faBoxArchive, faShieldCat, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import '@/styles/product.css';

const ProductComponent = ({data}) => {

    const [mainImg, setMainImg] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const subImgItems = data.imageList;

    useEffect(() => {
        setMainImg(subImgItems[activeIndex]);
    }, [activeIndex]);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const activeBtn = (button) => {
        let buttons = document.querySelectorAll('.pcolor');
        buttons.forEach(function (btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    };

    useEffect(() => {
        const firstButton = document.querySelector('.pcolor');
        if (firstButton) {
            firstButton.classList.add('active');
            activeBtn(firstButton);
        }
    }, []);

    const [cartNotificationVisible, setCartNotificationVisible] = useState(false);

    const addToCart = () => {
        setCartNotificationVisible(true);

        setTimeout(() => {
            setCartNotificationVisible(false);
        }, 3000);
    };

    useEffect(() => {
        const quantityInput = document.querySelector('.quantity-input');
        const decreaseButton = document.querySelector('.quantity-decrease');
        const increaseButton = document.querySelector('.quantity-increase');

        decreaseButton.addEventListener('click', function () {
            decreaseQuantity();
        });

        increaseButton.addEventListener('click', function () {
            increaseQuantity();
        });

        quantityInput.addEventListener('input', function () {
            limitQuantity();
        });

        quantityInput.addEventListener('blur', function () {
            resetIfEmpty();
        });

        return () => {
            decreaseButton.removeEventListener('click', decreaseQuantity);
            increaseButton.removeEventListener('click', increaseQuantity);
            quantityInput.removeEventListener('input', limitQuantity);
            quantityInput.removeEventListener('blur', resetIfEmpty);
        };
    }, []);

    function decreaseQuantity(e) {
        if (e) {
            e.preventDefault();
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
        }
    }

    function increaseQuantity(e) {
        if (e) {
            e.preventDefault();
            setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10));
        }
    }

    const limitQuantity = (e) => {
        if (e) {
            const value = parseInt(e.target.value, 10);
            setQuantity(Math.min(Math.max(value || 1, 1), 10));
        }
    };

    const resetIfEmpty = (e) => {
        if (e && e.target.value === '') {
            setQuantity(1);
        }
    };

    const [isFormVisible, setFormVisible] = useState(false);
    const formRef = useRef(null);

    const openForm = () => {
        setFormVisible(true);
    };

    const closeForm = () => {
        setFormVisible(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        closeForm();
    };

    const [isScrollVisible, setIsVisible] = useState(false);

      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      const formatPrice = (price) => {
          const formattedPrice = price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          });
          return formattedPrice.replace(/[^\d.]/g, '');
      };

      const discountedPrice = data.price - (data.price * data.discountPercentage / 100);

    return (
        <div className="body-wrapper">
            <div className="url">
                <a href="#">Home </a>
                <b> &#8250; </b>
                <a href="#">Product</a>
                <b> &#8250; </b>
                <a href="#">Laptop</a>
            </div>

            <div className="top-line"></div>

            <div className="product-box">
                <div className="left-box">
                    <div className="main-img">
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

                    <div className="service">
                        <div className="service-item">
                            <div className="service-item-child">
                                <FontAwesomeIcon className="service-icon" icon={faRotate} />
                                <div>
                                    <p>Cam kết lỗi 1 đổi 1 trong <b>30 ngày</b> đối với sản phẩm lỗi.</p>
                                    <a href="#">Xem chi tiết &#187;</a>
                                </div>
                            </div>
                            <div className="service-item-child">
                                <FontAwesomeIcon className="service-icon" icon={faShieldCat} />
                                <div>
                                    <p>Bảo hành chính hãng <b>12 tháng</b> tại các trung tâm bảo hành hãng</p>
                                    <a href="#">Xem địa chỉ bảo hành &#187;</a>
                                </div>
                            </div>
                        </div>

                        <div className="service-line"></div>

                        <div className="service-item">
                            <FontAwesomeIcon className="service-icon" icon={faBoxArchive} />
                            <div className="item-combo">
                                <b>Bộ sản phẩm gồm:</b>
                                <p>Hộp, Sách hướng dẫn, Cây lấy sim, Ốp lưng, Cáp microUSB</p>
                            </div>
                        </div>
                    </div>

                    <div className="product-content">
                        <div className="content-img">
                            <img src='https://cdn.tgdd.vn/Products/Images/44/305769/Kit/hp-245-g9-r5-6l1n9pa-glr-note.jpg'></img>
                        </div>

                        <h1>Product Detail</h1>

                        <h2>Header Content 100 lineeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                            eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee in DB</h2>

                        <p>Đây là content dài 1000000000000000000000000000000000000000000
                            dòngggggggggggggggggggggggggggggggggggggggggggg sds d đsd d dsdsd ds dsd sdsds ds
                            dsjvdjfsc dsbdjs vjxslv djjskvf ffsjf svjjvssv vjs sfjs scbshbv vcjdjdkcvjsvcsjv,m chbvhxbhkj
                            kkkv
                            slvn jjvkvslkv kvsljvn jvks vvvshhff v vvsvhhv jjjsd</p>
                    </div>
                </div>

                <div className="right-box">
                    <div className="right-box-top">
                        <div className="pname">{data.name}</div>
                        <p className="sold">100 Sold</p>

                        <div className="right-box-top-child">
                            <div className="ratings">
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                <FontAwesomeIcon className="star-icon" icon={faStar} />
                                <FontAwesomeIcon className="star-icon" icon={faStarHalfStroke} />
                                <p>100 Evaluate</p>
                            </div>

                            <div className="product-price">
                                <b>{formatPrice(data.price)}</b>
                                <b className="main-money-unit">đ</b>
                                <p>{formatPrice(discountedPrice)}</p>
                                <p className="main-money-unit">đ</p>
                            </div>

                            <div className="product-price-ratio">
                                <p>Down 10%</p>
                            </div>

                            <div className="VAT">
                                <div>VAT Included</div>
                                <div>Genuine 24 Month Warranty</div>
                            </div>

                            <p className="color">Color</p>

                            <div className="product-color">
                                <button className="pcolor" onClick={(e) => activeBtn(e.target)}>Black</button>
                                <button className="pcolor" onClick={(e) => activeBtn(e.target)}>Red</button>
                                <button className="pcolor" onClick={(e) => activeBtn(e.target)}>Pink</button>
                            </div>

                            <div className="quantity">
                                <p>Quantity</p>
                                <div className="quantity-control">
                                    <button className="quantity-decrease" onClick={decreaseQuantity}>-</button>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={quantity}
                                        onChange={(e) => limitQuantity(e)}
                                        onBlur={(e) => resetIfEmpty(e)}
                                        className="quantity-input"
                                    />
                                    <button className="quantity-increase" onClick={increaseQuantity}>+</button>
                                </div>
                            </div>

                            <div className="btn-box">
                                <button className="cart-btn" onClick={() => addToCart()}>
                                    <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                                </button>
                                <button className="buy-btn" onClick={openForm}>
                                    <FontAwesomeIcon icon={faCreditCard} /> Buy Now
                                </button>
                            </div>

                            <div className="call-to-order">Call to order now
                                <a href="tel:1900 301 297"> 1900 301 297 </a>
                                (7:30 - 22:00)
                            </div>
                        </div>
                    </div>

                    <div className="right-box-bottom">
                        {/* Detail table */}
                        <h1 className="detail-name">Configuration Information</h1>

                        <table className="detail-table">
                            <tbody>
                            {Object.entries(JSON.parse(data.productDetail)).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
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
                                    <img src={data.imageList[0]}></img>
                                </div>
                                <div className="recommended-main-content">
                                    <h1>Toy super vip pro</h1>
                                    <div className="accessories-price">
                                        <b>{formatPrice(data.price)}</b>
                                        <b className="money-unit">đ</b>
                                        <p>{formatPrice(discountedPrice)}</p>
                                        <p className="money-unit">đ</p>
                                    </div>
                                    <div className="accessories-price-ratio">
                                        <p>Down 5%</p>
                                    </div>
                                </div>
                            </div>

                            <div className="recommended-accessories-line"></div>

                            <ul className="recommended-accessories-list">
                                {data.purchaseComboItemList.map((item) => (
                                    <li className="recommended-accessories-item" key={item.id}>
                                        <div className="recommended-accessories-checkbox">
                                            <input type="checkbox" className="product" defaultChecked/>
                                        </div>

                                        <div className="recommended-accessories-img">
                                            <img
                                                src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                                        </div>
                                        <div className="recommended-accessories-content">
                                            <a href="#">{`${item.product.producer} ${item.product.model} ${item.product.name}`}</a>
                                            <div className="accessories-price">
                                                <b>{item.product.price - (item.product.price * item.discountPercentage / 100)}</b>
                                                <b className="money-unit">đ</b>
                                                <p>{item.product.price}</p>
                                                <p className="money-unit">đ</p>
                                            </div>
                                            <div className="accessories-price-ratio">
                                                <p>{`Down ${item.discountPercentage}%`}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                <li className="recommended-accessories-item">
                                    <div className="recommended-accessories-checkbox">
                                        <input type="checkbox" className="product" defaultChecked/>
                                    </div>

                                    <div className="recommended-accessories-img">
                                        <img
                                            src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                                    </div>
                                    <div className="recommended-accessories-content">
                                        <a href="#">Toy super vip pro</a>
                                        <div className="accessories-price">
                                            <b>900.000</b>
                                            <b className="money-unit">đ</b>
                                            <p>1.000.000</p>
                                            <p className="money-unit">đ</p>
                                        </div>
                                        <div className="accessories-price-ratio">
                                            <p>Down 20%</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="recommended-accessories-item">
                                    <div className="recommended-accessories-checkbox">
                                        <input type="checkbox" className="product" defaultChecked />
                                    </div>
                                    <div className="recommended-accessories-img">
                                        <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                                    </div>
                                    <div className="recommended-accessories-content">
                                        <a href="#">Toy super vip pro</a>
                                        <div className="accessories-price">
                                            <b>900.000</b>
                                            <b className="money-unit">đ</b>
                                            <p>1.000.000</p>
                                            <p className="money-unit">đ</p>
                                        </div>
                                        <div className="accessories-price-ratio">
                                            <p>Down 20%</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="recommended-accessories-item">
                                    <div className="recommended-accessories-checkbox">
                                        <input type="checkbox" className="product" defaultChecked />
                                    </div>
                                    <div className="recommended-accessories-img">
                                        <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                                    </div>
                                    <div className="recommended-accessories-content">
                                        <a href="#">Toy super vip pro</a>
                                        <div className="accessories-price">
                                            <b>900.000</b>
                                            <b className="money-unit">đ</b>
                                            <p>1.000.000</p>
                                            <p className="money-unit">đ</p>
                                        </div>
                                        <div className="accessories-price-ratio">
                                            <p>Down 20%</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="recommended-accessories-item">
                                    <div className="recommended-accessories-checkbox">
                                        <input type="checkbox" className="product" defaultChecked />
                                    </div>
                                    <div className="recommended-accessories-img">
                                        <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                                    </div>
                                    <div className="recommended-accessories-content">
                                        <a href="#">Toy super vip pro</a>
                                        <div className="accessories-price">
                                            <b>900.000</b>
                                            <b className="money-unit">đ</b>
                                            <p>1.000.000</p>
                                            <p className="money-unit">đ</p>
                                        </div>
                                        <div className="accessories-price-ratio">
                                            <p>Down 20%</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <div className="recommended-accessories-line"></div>

                            <div className="total-price">
                                <h1>Total Price:</h1>
                                <b>3.600.000</b>
                                <b className="money-unit">đ</b>
                                <p>4.000.000</p>
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
                <h1 className="similar-product-header">Similar products</h1>

                <div className="similar-product-line"></div>

                <ul className="similar-product-list">
                    <li className="similar-product-item">
                        <div className="similar-product-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="similar-product-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="similar-product-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="similar-product-item">
                        <div className="similar-product-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="similar-product-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="similar-product-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="similar-product-item">
                        <div className="similar-product-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="similar-product-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="similar-product-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="similar-product-item">
                        <div className="similar-product-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="similar-product-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="similar-product-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                </ul>
            </div>


            {/* Cart notification */}
            <div className="cart-notification" style={{ display: cartNotificationVisible ? 'block' : 'none' }}>
                <FontAwesomeIcon className="cart-check" icon={faCircleCheck} />
                The product has been added to Cart !
            </div>


            {/* FORM ORDER */}
            {isFormVisible && (
                <>
                    <div className="overlay" onClick={closeForm}></div>

                    <div className="popup" ref={formRef}>
                        <div className="popup-content">
                        <span className="close-form-btn" onClick={closeForm}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </span>
                            <h1>Order Form</h1>

                            <form className="order-form" onSubmit={handleFormSubmit}>
                                <label htmlFor="customerName">Name</label>
                                <input type="text" className="customerName" name="customerName" placeholder="example: Ngọc Trinh..."
                                       id="customerName" required></input>

                                <label htmlFor="customerAddress">Address</label>
                                <div className="address-selects">
                                    <select className="province" name="province" id="province" required defaultValue="">
                                        <option value="" disabled>--- Province ---</option>
                                        <option value="#">Hà Nội</option>
                                    </select>

                                    <select className="district" name="district" id="district" required defaultValue="">
                                        <option value="" disabled>--- District ---</option>
                                        <option value="#">Hà Đông</option>
                                    </select>

                                    <select className="ward" name="ward" id="ward" required defaultValue="">
                                        <option value="" disabled>--- Ward ---</option>
                                        <option value="#">Văn Quán</option>
                                    </select>
                                </div>

                                <label htmlFor="customerPhone">Phone Number</label>
                                <div className="phone-wrapper">
                                    <span className="phone-prefix">+84</span>
                                    <input type="tel" className="customerPhone" name="customerPhone" id="customerPhone" required></input>
                                </div>

                                <label htmlFor="customerEmail">Email</label>
                                <input type="email" className="customerEmail" name="customerEmail" placeholder="example@gmail.com"
                                       id="customerEmail" required></input>

                                <button type="submit">Confirm Order</button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            <button className="call-button">
                <a href="tel:+84123456789" className="info-menu2-li-a">
                    <FontAwesomeIcon icon={faPhoneVolume} />
                </a>
            </button>

            <div>
                {isScrollVisible && (
                    <button onClick={scrollToTop} className="scroll-to-top-button">
                      <FontAwesomeIcon icon={faCircleUp} />
                    </button>
                )}
            </div>
        </div>
    );

};

export default ProductComponent;
