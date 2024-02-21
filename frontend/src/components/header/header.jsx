"use client"
import "@/styles/header.css";
import {config, library} from '@fortawesome/fontawesome-svg-core';
import {
    faLocationDot,
    faEnvelope,
    faPhone,
    faFileSignature,
    faCircleUser,
    faCartShopping,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from "react";
import SearchBar from "@/components/searchBar";

library.add(faLocationDot, faEnvelope, faPhone, faFileSignature, faCircleUser, faCartShopping, faMagnifyingGlass);

config.autoAddCss = false;

export default function Header() {
    const [searchVariable, setSearchVariable] = useState("");
    const [searchValue, setSearchValue] = useState([]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchVariable(value);
        // Thực hiện tìm kiếm ở đây (có thể gọi một hàm hoặc action)
        // Ví dụ: onSearch(value);
    };


    return (
        <header className="header_">
            {/*TOP HEADER*/}
            <div className="top-header">
                <nav>
                    <ul className="info-menu1">
                        <li className="info-menu1-li">
                            <a className="info-menu1-a" href=""><p>item 1</p></a>
                        </li>
                        <li className="info-menu1-li">
                            <a className="info-menu1-a" href=""><p>item 2</p></a>
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
            <div className="inner-header container">
                <a href="" id="logo">This is logo - nhờ Dev Dương design hộ</a>
                {/*       Search         */}
                <div className="search-wrapper">
                    <div>
                        <SearchBar/>
                    </div>
                </div>
                <nav>
                    <ul className="main-menu">
                        <li>
                            <FontAwesomeIcon icon={faFileSignature} className="main-menu-i"/>
                            <a className="main-menu-a" href="">Check oder</a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCircleUser} className="main-menu-i"/>
                            <a className="main-menu-a" href="">Login/Register</a>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCartShopping} className="main-menu-i"/>
                            <a className="main-menu-a" href="">My cart</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/*SUB MENU*/}
            <nav>
                <ul id="sub-menu">
                    <li>
                        <a href="">smartphone</a>
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
                        <a href="/product">laptop</a>
                        <ul id="sub-drop">
                            <li><img src="/header_img/drop-menu-mouse.webp" alt=""/>
                                <a href="">mouse</a>
                            </li>
                            <li><img id="fix" src="/header_img/drop-menu-keyboard.webp" alt=""/><a
                                href="">keyboard</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="">tablet</a>
                        <ul id="sub-drop">
                            <li><img src="/header_img/drop-menu-mouse.webp" alt=""/><a
                                href="">mouse</a>
                            </li>
                            <li><img id="fix" src="/header_img/drop-menu-keyboard.webp" alt=""/><a
                                href="">keyboard</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="">smartwatch</a>
                        <ul id="sub-drop">
                            <li><img src="/header_img/drop-menu-mouse.webp" alt=""/><a
                                href="">mouse</a>
                            </li>
                            <li><img id="fix" src="/header_img/drop-menu-keyboard.webp" alt=""/><a
                                href="">keyboard</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="">accessory</a>
                        <ul id="sub-drop">
                            <li><img src="/header_img/drop-menu-mouse.webp" alt=""/><a
                                href="">mouse</a>
                            </li>
                            <li><img id="fix" src="/header_img/drop-menu-keyboard.webp" alt=""/><a
                                href="">keyboard</a></li>
                            <li><img src="/header_img/drop-menu-earphone.webp" alt=""/><a
                                href="">earphone</a></li>
                            <li><img src="/header_img/drop_menu_charge.webp" alt=""/><a
                                href="">charge</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>

        </header>
    )
}
