import dotenv from 'dotenv';
import AnimationCarousel from "@/components/slider";
import Link from "next/link";
import useSWR from 'swr';
import fetcher from "@/utils/fetchAPI";
import ProductListComponent from "@/components/home/ProductList";
import Head from "next/head";
import CustomErrorPage from "@/pages/error";

dotenv.config();

export default function Home() {

    const laptopApi = `${process.env.DOMAIN}/products/header?type=laptop&limit=5`;
    const headphoneApi = `${process.env.DOMAIN}/products/header?type=headphone&limit=5`;
    const mouseApi = `${process.env.DOMAIN}/products/header?type=mouse&limit=5`;

    const { data: laptopData, error: laptopError } = useSWR(laptopApi, fetcher);
    const { data: headphoneData, error: headphoneError } = useSWR(headphoneApi, fetcher);
    const { data: mouseData, error: mouseError } = useSWR(mouseApi, fetcher);

    if (laptopError || headphoneError || mouseError) return <CustomErrorPage statusCode="404" />;

    if (!laptopData || !headphoneData || !mouseData) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>
                    Welcome to Shop
                </title>
            </Head>
            <div className="slider">
                <AnimationCarousel/>
            </div>
            {/*     CATEGORY    */}
            <div className="category-hompage w-full flex justify-center flex-wrap h-80">
                <div className="w-full h-2/5 flex flex-wrap">
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-center w-full text-5xl">
                            DANH MỤC NỔI BẬT
                        </p>
                    </div>
                </div>
                <div className="w-full h-3/5 flex justify-around">
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                        href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                        href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                        href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                        href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                        href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-125 hover:transition-transform hover:duration-500 rounded-md"
                        href="/products">
                        <img src="https://dlcdnwebimgs.asus.com/gain/30D1F34B-0C37-4D9D-92E4-487372FD254F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">Laptop</p>
                    </Link>
                </div>
            </div>

            {/* Khuyến Mãi */}
            <div className="w-full h-80 flex flex-wrap justify-center align-middle mt-10">
                <div className="w-full flex items-end">
                    <p className="text-3xl pl-6 text-center w-full pb-3">
                        ƯU ĐÃI NGÀY TẾT, SẮM BẰNG HẾT
                    </p>
                </div>
                <div className="w-full h-3/5 flex">
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
            <div className="h-1/5 w-full">
                <div className="h-4/5">
                    <ProductListComponent productData={laptopData}/>
                </div>
            </div>
            <div className="h-1/5 w-full">
                <div className="h-4/5">
                    <ProductListComponent productData={headphoneData}/>
                </div>
            </div>
            <div className="h-1/5 w-full">
                <div className="h-4/5">
                    <ProductListComponent productData={mouseData}/>
                </div>
            </div>

        </>
    )
}
