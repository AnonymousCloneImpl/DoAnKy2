import React, { useState, useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke, faCircleCheck, faCartShopping, faCreditCard, faBoxArchive, faShieldCat, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import '@/styles/product.css';

import result from "@/utils/fetchAPI.js";
const url = `${process.env.DOMAIN}/product`;

const ProductComponent = () => {
    const {data, isLoading, isError} = result(url);

    const [mainImg, setMainImg] = useState('');
    const subImgItemsRef = useRef([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const mainImage = document.querySelector('.main-img img');
        if (mainImage) {
            setMainImg(mainImage.src);
        }

        subImgItemsRef.current = Array.from(document.querySelectorAll('.sub-img-item'));
    }, []);

    const showMain = (pic) => {
        setMainImg(pic);
    };

    const handleClick = (index) => {
        console.log('handleClick called with index:', index);
        const imgElement = subImgItemsRef.current[index]?.querySelector('img');
        if (imgElement) {
            showMain(imgElement.src);
        }
    };

    useEffect(() => {
        subImgItemsRef.current.forEach((item, index) => {
            item.addEventListener('click', () => handleClick(index));
        });

        return () => {
            subImgItemsRef.current.forEach((item, index) => {
                item.removeEventListener('click', () => handleClick(index));
            });
        };
    }, [subImgItemsRef]);

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
                        <img src="https://hanoicomputer.net/wp-content/uploads/2022/08/Laptop-Dell-Inspiron-3501-3692BLK1..jpg"
                            alt="Main Image">
                        </img>
                    </div>

                    <div className="sub-img-list">
                        <div className="sub-img-item active">
                            <img src="https://hanoicomputer.net/wp-content/uploads/2022/08/Laptop-Dell-Inspiron-3501-3692BLK1..jpg"
                                onClick={() => showMain("https://hanoicomputer.net/wp-content/uploads/2022/08/Laptop-Dell-Inspiron-3501-3692BLK1..jpg")}
                                alt="Sub-Image">
                            </img>
                        </div>
                        <div className="sub-img-item">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"
                                onClick={() => showMain("https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png")}>
                            </img>
                        </div>
                        <div className="sub-img-item">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_8.png"
                                onClick={() => showMain("https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_8.png")}>
                            </img>
                        </div>
                        <div className="sub-img-item">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_6.png"
                                onClick={() => showMain("https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_6.png")}>
                            </img>
                        </div>
                        <div className="sub-img-item">
                            <img src="https://hanoicomputer.net/wp-content/uploads/2023/05/74484_laptop_dell_inspiron_3520__71003262___2_.jpg"
                                onClick={() => showMain("https://hanoicomputer.net/wp-content/uploads/2023/05/74484_laptop_dell_inspiron_3520__71003262___2_.jpg")}>
                            </img>
                        </div>
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
                        <h1>Product Detail</h1>
                        <p>Đây là content dài 1000000000000000000000000000000000000000000
                            dòngggggggggggggggggggggggggggggggggggggggggggg sds d đsd d dsdsd ds dsd sdsds ds
                            dsjvdjfsc dsbdjs vjxslv djjskvf ffsjf svjjvssv vjs sfjs scbshbv vcjdjdkcvjsvcsjv,m chbvhxbhkj
                            kkkv
                            slvn jjvkvslkv kvsljvn jvks vvvshhff v vvsvhhv jjjsd</p>
                    </div>
                </div>

                <div className="right-box">
                    <div className="right-box-top">
                        <div className="pname">Laptop Super vip</div>
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

                            <div className="product-price">$500</div>

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
                        <h1 className="detail-name">Laptop Super vip detail</h1>

                        <table className="detail-table">
                            <tbody>
                                {data && data.map((product) => (
                                            <tr key={product.id}>
                                                <td className="left-tbl">Name</td>
                                                <td className="right-tbl">{product.name}</td>
                                            </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* Recommended Accessories */}
            <div className="recommended-accessories">
                <h1 className="recommended-header">Recommended Accessories</h1>

                <div className="recommended-accessories-line"></div>

                <ul className="recommended-list">
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                </ul>
            </div>


            {/* Similar products */}
            <div className="recommended-accessories">
                <h1 className="recommended-header">Similar products</h1>

                <div className="recommended-accessories-line"></div>

                <ul className="recommended-list">
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart</button>
                        </div>
                    </li>
                    <li className="recommended-item">
                        <div className="recommended-img">
                            <img src="https://hanoicomputercdn.com/media/product/71741_lenovo_ideapad_slim_5_pro_10.png"></img>
                        </div>
                        <div className="recommended-content">
                            <a href="#">Toy super vip pro</a>
                            <button className="recommended-cart-btn" onClick={() => addToCart()}>
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
        </div>
    );
};

export default ProductComponent;
