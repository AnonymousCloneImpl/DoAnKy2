"use client"
import "@/styles/header.css";
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
    faLaptop,
    faKeyboard,
    faScrewdriverWrench,
    faLocationDot,
    faEnvelope,
    faPhone,
    faFileSignature,
    faCircleUser,
    faCartShopping,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import fetcher from "@/utils/fetchAPI";
import Link from "next/link";
import Image from "next/image";

library.add(faLocationDot, faEnvelope, faPhone, faFileSignature, faCircleUser, faCartShopping, faMagnifyingGlass);

config.autoAddCss = false;

export default function Header() {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState({});

    const handleSearchChange = async (e) => {
        const inputValue = e.target.value;

        if (inputValue === "") {
            setResults({
                status: 205,
                message: "input is empty",
                data: []
            });
            setShowResults(true);
        } else {
            let url = `${process.env.DOMAIN}/search?keyword=${inputValue}`;

            try {
                const data = await fetcher(url);
                if (data.data.length === 0 && data.status === 20) {
                    setResults([]);
                    setShowResults(true);
                }
                const searchResultElement = document.querySelector('.search_result');
                if (searchResultElement) {
                    searchResultElement.style.display = 'block';
                }
                setResults(data);
                setShowResults(true);
            } catch (error) {
                console.error(error);
            }
        }
    };


    const handleBlur = () => {
        setShowResults(false);
    };

    return (
        <header className="header_">
            {/*TOP HEADER*/}
            <div className="top-header">
                <nav>
                    <ul className="info-menu1">
                        <li className="info-menu1-li">
                            <a className="info-menu1-a" href=""><p>Schedule A Repair</p></a>
                        </li>
                        <li className="info-menu1-li">
                            <a className="info-menu1-a" href=""><p>About Us</p></a>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <ul className="info-menu2">
                        <li className="info-menu2-li">
                            <a
                                href="https://www.google.com/maps/place/FPT+Aptech+H%C3%A0+N%E1%BB%99i+-+H%E1%BB%87+th%E1%BB%91ng+%C4%91%C3%A0o+t%E1%BA%A1o+l%E1%BA%ADp+tr%C3%ACnh+vi%C3%AAn+qu%E1%BB%91c+t%E1%BA%BF/@21.0288251,105.7797218,17z/data=!4m6!3m5!1s0x3135ab00954decbf:0xdb4ee23b49ad50c8!8m2!3d21.0288201!4d105.7822967!16s%2Fg%2F11vj7r6gkp?hl=vi&entry=ttu"
                                className="info-menu2-li-a"
                            >
                                <FontAwesomeIcon icon={faLocationDot} className="info-menu2-li-i"/>
                                8A Tôn Thất Thuyết, Mỹ Đình, Nam Từ Liêm, Hà Nội
                            </a>
                        </li>
                        <li className="info-menu2-li">
                            <a href="mailto:mos98er@gmail.com" className="info-menu2-li-a">
                                <FontAwesomeIcon icon={faEnvelope} className="info-menu2-li-i"/>
                                mos98er@gmail.com
                            </a>
                        </li>
                        <li className="info-menu2-li">
                            <FontAwesomeIcon icon={faPhone} className="fa-phone info-menu2-li-i"/>
                            <a href="tel:+84123456789" className="info-menu2-li-a">+84 123 456 789</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/*INNER HEADER*/}
            <div className="inner-header">
                <div className="inner-header-form">
                    <div className="logo-wrapper">
                        <Link href="/" id="logo">
                            <img src="/spirals.png" alt="logo" width="50" height="50" />
                        </Link>
                        <p>Thế Giới Manh Động</p>
                        <b>.com</b>
                    </div>
                    {/*       Search         */}
                    <div className="search-wrapper">
                        <div>
                            <input type="text" placeholder="Search..." id="searchInput"
                                   onBlur={handleBlur}
                                   onInput={(e) => handleSearchChange(e)}
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifying-glass"/>
                        </div>
                    </div>
                    <div className="main-menu-container">
                        <ul className="main-menu">
                            <li className="main-menu-left">
                                <FontAwesomeIcon icon={faFileSignature} className="main-menu-i"/>
                                <a className="main-menu-a" href="">Check oder</a>
                            </li>
                            <li className="main-menu-right">
                                <FontAwesomeIcon icon={faCartShopping} className="main-menu-i"/>
                                <a className="main-menu-a" href="">My cart</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/*SUB MENU*/}
            <nav id="sub-menu-nav">
                <ul id="sub-menu">
                    <li>
                        <div className="sub-menu-item">
                            <FontAwesomeIcon icon={faLaptop} className="sub-menu-i"/>
                            <a href="/src/pages/products/[id]">laptop</a>
                        </div>
                        <ul id="sub-drop">
                            <li>
                                <img src="/header_img/drop-menu-mouse.webp" alt=""/>
                                <a href="">mouse</a>
                            </li>
                            <li>
                                <img id="fix" src="/header_img/drop-menu-keyboard.webp" alt=""/>
                                <a href="">keyboard</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className="sub-menu-item">
                            <FontAwesomeIcon icon={faKeyboard} className="sub-menu-i"/>
                            <a href="">accessories</a>
                        </div>
                        <ul id="sub-drop">
                            <li><img src="/header_img/drop-menu-mouse.webp" alt=""/>
                                <a href="">mouse</a>
                            </li>
                            <li><img id="fix" src="/header_img/drop-menu-keyboard.webp" alt=""/><a
                                href="">keyboard</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="sub-menu-item">
                            <FontAwesomeIcon icon={faScrewdriverWrench} className="sub-menu-i"/>
                            <a href="">build your PC</a>
                        </div>
                    </li>
                </ul>
            </nav>

            {showResults && (
                <div className="search_result">
                    {
                        // results.data.length > 0 ? (
                        results.data.map((result) => (
                            <div className="search_result_item" key={result.id}>
                                <div className="result_image">
                                    <img className="result_image_item" src={result.image[0]} />
                                </div>
                                <div className="result_info">
                                    <div className="top_result">
                                        <a className="result_name" href={`/products/${result.id}`}>{`${result.name}`}</a>
                                        <p className="result_price_ratio">{`-${result.discountPercentage}%`}</p>
                                    </div>
                                    <div className="bottom_result">
                                        <b className="price_discount">{result.price - (result.price * result.discountPercentage / 100)}đ</b>
                                        <p className="price">{result.price}đ</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        // ) : (
                    //     <p>No results found.</p>
                    // )
                    }
                </div>
            )}

        </header>
    )
}