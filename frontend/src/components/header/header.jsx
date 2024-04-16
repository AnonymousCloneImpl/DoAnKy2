import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faCartShopping,
  faCircleUser,
  faComputer,
  faEnvelope,
  faFileSignature,
  faGears,
  faKeyboard,
  faLaptop,
  faLocationDot,
  faMagnifyingGlass,
  faPhone,
  faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import fetcher from "@/utils/fetchAPI";
import Link from "next/link";
import FormatPrice from "@/components/FormatPrice";
import Image from "next/image";
import CartIcon from "@/components/CartNumber";
import { useRouter } from "next/router";

library.add(faLocationDot, faEnvelope, faPhone, faFileSignature, faCircleUser, faCartShopping, faMagnifyingGlass);

config.autoAddCss = false;

export default function Header() {
  const [showResults, setShowResults] = useState(false);
  const [isHoveringOnSearchResult, setIsHoveringOnSearchResult] = useState(false);
  const [results, setResults] = useState({});
  const [showPart, setShowPart] = useState(false);
  const [showGear, setShowGear] = useState(false);
  const router = useRouter();

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
      let url = `${process.env.DOMAIN}/search?q=${inputValue}&limit=5`;

      try {
        const data = await fetcher(url);
        if (data.length === 0) {
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
    if (!document.activeElement.classList.contains('search_result') && !isHoveringOnSearchResult) {
      setShowResults(false);
      clearSearchInput();
    }
  };

  const handleSearchResultHover = () => {
    setIsHoveringOnSearchResult(true);
  };

  const handleSearchResultLeave = () => {
    setIsHoveringOnSearchResult(false);
  };

  const handleResultLinkClick = () => {
    setShowResults(false);
    clearSearchInput();
  };

  const clearSearchInput = () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.value = "";
    }
  };

  const [cartNumber, setCartNumber] = useState(0);

  useEffect(() => {
    const storedItemList = localStorage.getItem('itemList');

    if (storedItemList) {
      const ls = JSON.parse(storedItemList);
      setCartNumber(ls.length);
    } else {
      setCartNumber(0);
    }

    setShowPart(false);
    setShowGear(false);
    setShowResults(false);
  }, [router.pathname]);

  const handlePcPartClick = () => {
    setShowPart(!showPart);
    setShowGear(false);
  }

  const handleGearClick = () => {
    setShowGear(!showGear);
    setShowPart(false);
  }

  return (
    <header className="header_">
      {/*TOP HEADER*/}
      <div className="top-header">
        <nav>
          <ul className="info-menu1">
            <li className="info-menu1-li">
              <Link className="info-menu1-a" href="/service"><p>Schedule A Repair</p></Link>
            </li>
            <li className="info-menu1-li">
              <Link className="info-menu1-a" href="/about-us"><p>About Us</p></Link>
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
                <FontAwesomeIcon icon={faLocationDot} className="info-menu2-li-i" />
                8A Tôn Thất Thuyết, Mỹ Đình, Nam Từ Liêm, Hà Nội
              </a>
            </li>
            <li className="info-menu2-li">
              <a href="mailto:mos98er@gmail.com" className="info-menu2-li-a">
                <FontAwesomeIcon icon={faEnvelope} className="info-menu2-li-i" />
                mos98er@gmail.com
              </a>
            </li>
            <li className="info-menu2-li">
              <FontAwesomeIcon icon={faPhone} className="fa-phone info-menu2-li-i" />
              <a href="tel:+84123456789" className="info-menu2-li-a">+84 123 456 789</a>
            </li>
          </ul>
        </nav>
      </div>

      {/*INNER HEADER*/}
      <div className="inner-header">
        <div className="inner-header-form">
          <div className="logo-wrapper">
            <Link href="/" id="logo" className="flex">
              <Image src="/favico.png" alt="logo" width="50" height="50" />
              <p>QuantumTECH</p>
              <b>.com</b>
            </Link>
          </div>
          {/*       Search         */}
          <div className="search-wrapper">
            <div
              onMouseEnter={handleSearchResultHover}
              onMouseLeave={handleSearchResultLeave}
            >
              <input type="text" placeholder="Search..." id="searchInput"
                onBlur={handleBlur}
                onInput={(e) => handleSearchChange(e)}
              />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifying-glass" />
            </div>
          </div>
          <div className="main-menu-container">
            <ul className="main-menu">
              <li className="main-menu-left">
                <Link className="main-menu-a hover:text-red-800" href="/check-order">
                  <FontAwesomeIcon icon={faFileSignature} className="main-menu-i" />
                  Check oder</Link>
              </li>
              <li className="main-menu-right flex">
                <CartIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*SUB MENU*/}
      <nav id="sub-menu-nav">
        <ul id="sub-menu" className="h-12 font-semibold uppercase max-sm:h-10">
          <li>
            <Link href="/laptop" className="flex justify-center items-center h-full w-full">
              <FontAwesomeIcon icon={faLaptop} className="sub-menu-i" />
              <p className="sub-menu-item text-xl">
                Laptop
              </p>
            </Link>
          </li>
          <li>
            <button className="flex justify-center items-center w-full h-full" onClick={handleGearClick}>
              <FontAwesomeIcon icon={faKeyboard} className="sub-menu-i" />
              <p className="sub-menu-item text-xl uppercase">Gear</p>
            </button>
            {showGear && (
              <ul id="sub-drop">
                <li><img src="/header_img/drop-menu-mouse.webp" alt="" />
                  <Link href="/mouse">Mouse</Link>
                </li>
                <li><img id="fix" src="/header_img/drop-menu-keyboard.webp" alt="" />
                  <Link href="/keyboard">Keyboard</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-headphone.webp" alt="" />
                  <Link href="/headphone">Headphone</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button className="flex justify-center items-center h-full w-full" onClick={handlePcPartClick}>
              <FontAwesomeIcon icon={faGears} className="sub-menu-i" />
              <p className="sub-menu-item text-xl uppercase">
                PC Parts
              </p>
            </button>
            {showPart === true ? (
              <ul id="sub-drop">
                <li><img id='fix' src="/header_img/drop-menu-cpu.jfif" alt="" />
                  <Link href="/cpu">CPU</Link>
                </li>
                <li><img id="fix" src="/header_img/drop-menu-cpu-cooler.jfif" alt="" />
                  <Link href="/cpu-cooler">CPU COOLER</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-motherboard.jfif" alt="" />
                  <Link href="/motherboard">MOTHERBOARD</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-memory.jfif" alt="" />
                  <Link href="/memory">MEMORY</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-storage.jfif" alt="" />
                  <Link href="/storage">STORAGE</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-gpu.jfif" alt="" />
                  <Link href="/gpu">GPU</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-case.jpg" alt="" />
                  <Link href="/case">CASE</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-case-fan.jpg" alt="" />
                  <Link href="/case-fan">CASE FAN</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-power.jfif" alt="" />
                  <Link href="/power-supply-unit">POWER SUPPLY UNIT</Link>
                </li>
                <li>
                  <img id="fix" src="/header_img/drop-menu-monitor.webp" alt="" />
                  <Link href="/monitor">MONITOR</Link>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </li>
          <li>
            <Link href="/service" className="flex justify-center items-center h-full w-full">
              <FontAwesomeIcon icon={faScrewdriverWrench} className="sub-menu-i" />
              <p className="sub-menu-item text-xl">
                Service
              </p>
            </Link>
          </li>
          <li>
            <Link href="/build-pc" className="flex justify-center items-center h-full w-full">
              <FontAwesomeIcon icon={faComputer} className="sub-menu-i" />
              <p className="sub-menu-item text-xl">Build PC</p>
            </Link>
          </li>
        </ul>
      </nav>

      {showResults && (
        <div className="search_result"
          onMouseEnter={handleSearchResultHover}
          onMouseLeave={handleSearchResultLeave}
        >
          {
            results.length > 0 ? (
              results.map((result) => (
                <Link className="search_result_item" onClick={handleResultLinkClick} key={result.id}
                  href={`/${result.type.toLowerCase()}/${result.name.toLowerCase().replace(/\s/g, "-")}?model=${result.model.toLowerCase().replaceAll(" ", "-")}`}>
                  <div className="flex">
                    <div className="result_image">
                      <img className="result_image_item" src={result.image} />
                    </div>
                    <div className="result_info">
                      <div className="top_result">
                        <p className="result_name font-bold mt-1">{result.name}</p>
                        <div className="result_price_ratio">
                          <p className="result_price_ratio_value text-center">{`-${result.discountPercentage}%`}</p>
                        </div>
                      </div>
                      <div className="bottom_result pt-npm8">
                        <div className='mr-2'>
                          <FormatPrice
                            price={result.price - (result.price * result.discountPercentage / 100)}
                            type={"discount"} />
                        </div>
                        <FormatPrice price={result.price} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex justify-center h-20 items-center">
                <p>No results found.</p>
              </div>
            )
          }
        </div>
      )}

    </header>
  )
}
