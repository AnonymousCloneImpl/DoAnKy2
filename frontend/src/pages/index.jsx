import dotenv from 'dotenv';
import AnimationCarousel from "@/components/slider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faCartPlus} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Footer from "@/components/footer/footer";
import useSWR from 'swr';
import fetcher from "@/utils/fetchAPI";

dotenv.config();

export default function Home() {

    const url = `${process.env.DOMAIN}/products`;

    const {data, error} = useSWR(url, fetcher);

    if (error) return <div>Error loading data</div>;

    if (!data) return <div>Loading...</div>;

    return (
        <div className="homepage">
            <div className="slider">
                <AnimationCarousel/>
            </div>
            {/*     CATEGORY    */}
            <div className="category-hompage w-full flex justify-center flex-wrap h-80">
                <div className="w-10/12 h-2/5 flex flex-wrap">
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-center w-full text-5xl">
                            DANH MỤC NỔI BẬT
                        </p>
                    </div>
                </div>
                <div className="w-10/12 h-3/5 flex justify-around">
                    <Link className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                          href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full" />
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                          href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full" />
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                          href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full" />
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                          href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full" />
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                          href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full" />
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                          href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full" />
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                </div>
            </div>

            {/* Khuyến Mãi */}
            <div className="w-full h-80 flex flex-wrap justify-center align-middle mt-10">
                <div className="w-10/12 flex items-end">
                    <p className="text-3xl pl-6 text-center w-full pb-3">
                        ƯU ĐÃI NGÀY TẾT, SẮM BẰNG HẾT
                    </p>
                </div>
                <div className="w-10/12 h-3/5 flex">
                    <Link href="" className="h-full w-2/6 ml-1 mr-1">
                        <img
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/SIS%20asus.png"
                            className="w-full h-full"
                        />
                    </Link>
                    <Link href="" className="h-full w-2/6 ml-1 mr-1">
                        <img
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/laptop-hssv-sliding-2024.jpg"
                            className="w-full h-full"
                        />
                    </Link>
                    <Link href="" className="h-full w-2/6 ml-1 mr-1">
                        <img
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/uu-dai-giam-1tr-mac-690-300.png"
                            className="w-full h-full"
                        />
                    </Link>
                </div>
            </div>

            {/* Product theo danh muc*/}
            <div className="block-products flex justify-center h-full">
                <div className="w-10/12 h-full">
                    <div className="h-1/5 w-full flex items-center">
                        <div className="w-full h-1/2 border border-y-red-600 flex justify-between items-center">
                            <p className="text-3xl pl-8 w-2/12">LAPTOP</p>
                            <Link href="/products" className="pl-8 w-2/12">Xem thêm</Link>
                        </div>
                    </div>
                    <div className="h-4/5 w-full flex">
                        {data.map((product) => (
                            <div
                                className="w-1/5 h-full rounded-md homepage-card-item ml-2 mr-2 overflow-hidden transition-transform transform hover:scale-105 hover:transition-transform hover:duration-500 hover:homepage-card-item"
                                key={product.id}
                            >
                                <div className="w-full h-6 flex justify-end">
                                    <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-md">-{product.discountPercentage}%</p>
                                </div>
                                <div className="h-3/6 w-full">
                                    {/*<Image src="" alt="image" height="100" width="100"/>*/}
                                    <img
                                        src={product.image[0]}
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="flex items-center pt-3 h-1/6 w-full">
                                    <p className="pl-3 h-full w-full">{product.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="price_discount pl-3">{product.price - (product.price * product.discountPercentage / 100)}đ</p>
                                    <p className="price">{product.price}đ</p>
                                </div>
                                <div className="w-full h-1/6 flex space-x-4 justify-center items-center">
                                    <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                        <div>
                                            <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                        </div>
                                    </button>
                                    <button className="text-white h-3/4 rounded-md bg-red-600 w-5/12">
                                        <div>
                                            <FontAwesomeIcon icon={faCreditCard}/> Buy Now
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            <div className="block-products flex justify-center h-full">
                <div className="w-10/12 h-full">
                    <div className="h-1/5 flex items-center">
                        <p className="text-3xl pl-8">LAPTOP</p>
                    </div>
                    <div className="h-4/5 w-full flex">
                        <div className="w-1/5 h-full rounded-md homepage-card-item ml-2 mr-2">
                            <div className="w-full flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-md">-25%</p>
                            </div>
                            <div className="h-3/6 w-full">
                                {/*<Image src="" alt="image" height="100" width="100"/>*/}
                                <img
                                    src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/p/gpu.png"/>
                            </div>
                            <div>
                                <p className="pl-3">ASUS TUF Gaming FX507VV</p>
                            </div>
                            <div className="flex h-1/6 items-center">
                                <p className="price_discount pl-3">30000000đ</p>
                                <p className="price">30000000đ</p>
                            </div>
                            <div className="w-full h-1/6 flex space-x-4 justify-center items-center">
                                <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                    <div>
                                        <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                    </div>
                                </button>
                                <button className="text-white h-3/4 rounded-md bg-red-600 w-5/12">
                                    <div>
                                        <FontAwesomeIcon icon={faCreditCard}/> Buy Now
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="w-1/5 h-full rounded-md homepage-card-item ml-2 mr-2">
                            <div className="w-full flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-md">-25%</p>
                            </div>
                            <div className="h-3/6 w-full">
                                {/*<Image src="" alt="image" height="100" width="100"/>*/}
                                <img
                                    src="https://product.hstatic.net/200000837185/product/laptopgamingasustuff15fx507vv-lp157w_2f86df45d1f549be964801c1bfa4adab_master.png"/>
                            </div>
                            <div>
                                <p className="pl-3">ASUS TUF Gaming FX507VV</p>
                            </div>
                            <div className="flex h-1/6 items-center">
                                <p className="price_discount pl-3">30000000đ</p>
                                <p className="price">30000000đ</p>
                            </div>
                            <div className="w-full h-1/6 flex space-x-4 justify-center items-center">
                                <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                    <div>
                                        <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                    </div>
                                </button>
                                <button className="text-white h-3/4 rounded-md bg-red-600 w-5/12">
                                    <div>
                                        <FontAwesomeIcon icon={faCreditCard}/> Buy Now
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="w-1/5 h-full rounded-md homepage-card-item ml-2 mr-2">
                            <div className="w-full flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-md">-25%</p>
                            </div>
                            <div className="h-3/6 w-full">
                                {/*<Image src="" alt="image" height="100" width="100"/>*/}
                                <img
                                    src="https://product.hstatic.net/200000837185/product/laptopgamingasustuff15fx507vv-lp157w_2f86df45d1f549be964801c1bfa4adab_master.png"/>
                            </div>
                            <div>
                                <p className="pl-3">ASUS TUF Gaming FX507VV</p>
                            </div>
                            <div className="flex h-1/6 items-center">
                                <p className="price_discount pl-3">30000000đ</p>
                                <p className="price">30000000đ</p>
                            </div>
                            <div className="w-full h-1/6 flex space-x-4 justify-center items-center">
                                <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                    <div>
                                        <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                    </div>
                                </button>
                                <button className="text-white h-3/4 rounded-md bg-red-600 w-5/12">
                                    <div>
                                        <FontAwesomeIcon icon={faCreditCard}/> Buy Now
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="w-1/5 h-full rounded-md homepage-card-item ml-2 mr-2">
                            <div className="w-full flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-md">-25%</p>
                            </div>
                            <div className="h-3/6 w-full">
                                {/*<Image src="" alt="image" height="100" width="100"/>*/}
                                <img
                                    src="https://product.hstatic.net/200000837185/product/laptopgamingasustuff15fx507vv-lp157w_2f86df45d1f549be964801c1bfa4adab_master.png"/>
                            </div>
                            <div>
                                <p className="pl-3">ASUS TUF Gaming FX507VV</p>
                            </div>
                            <div className="flex h-1/6 items-center">
                                <p className="price_discount pl-3">30000000đ</p>
                                <p className="price">30000000đ</p>
                            </div>
                            <div className="w-full h-1/6 flex space-x-4 justify-center items-center">
                                <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                    <div>
                                        <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                    </div>
                                </button>
                                <button className="text-white h-3/4 rounded-md bg-red-600 w-5/12">
                                    <div>
                                        <FontAwesomeIcon icon={faCreditCard}/> Buy Now
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="w-1/5 h-full rounded-md homepage-card-item ml-2 mr-2">
                            <div className="w-full flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-md">-25%</p>
                            </div>
                            <div className="h-3/6 w-full">
                                {/*<Image src="" alt="image" height="100" width="100"/>*/}
                                <img
                                    src="https://product.hstatic.net/200000837185/product/laptopgamingasustuff15fx507vv-lp157w_2f86df45d1f549be964801c1bfa4adab_master.png"/>
                            </div>
                            <div>
                                <p className="pl-3">ASUS TUF Gaming FX507VV</p>
                            </div>
                            <div className="flex h-1/6 items-center">
                                <p className="price_discount pl-3">30000000đ</p>
                                <p className="price">30000000đ</p>
                            </div>
                            <div className="w-full h-1/6 flex space-x-4 justify-center items-center">
                                <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                    <div>
                                        <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                    </div>
                                </button>
                                <button className="text-white h-3/4 rounded-md bg-red-600 w-5/12">
                                    <div>
                                        <FontAwesomeIcon icon={faCreditCard}/> Buy Now
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
