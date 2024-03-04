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

    const laptopApi = `${process.env.DOMAIN}/products/laptop?limit=5`;
    const headphoneApi = `${process.env.DOMAIN}/products/headphone?limit=5`;
    const mouseApi = `${process.env.DOMAIN}/products/mouse?limit=5`;

    const { data: laptopData, error: laptopError } = useSWR(laptopApi, fetcher);
    const { data: headphoneData, error: headphoneError } = useSWR(headphoneApi, fetcher);
    const { data: mouseData, error: mouseError } = useSWR(mouseApi, fetcher);

    if (laptopError || headphoneError || mouseError) return <CustomErrorPage statusCode="404" />;

    if (laptopError === [] || headphoneError === [] || mouseError === []) return <CustomErrorPage statusCode="404" />;

    if (!laptopData || !headphoneData || !mouseData) return <div>Loading...</div>;

    return (

        <div>
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
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
                        href="/laptop">
                        <img src="https://dlcdnwebimgs.asus.com/gain/868C3307-DD02-4624-8BA7-31B62EE4A38F/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">LAPTOP</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
                        href="/headphone">
                        <img src="https://dlcdnwebimgs.asus.com/gain/070A915A-ED63-4C9E-B837-F6F1766E2863/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">HEADPHONE</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
                        href="/mouse">
                        <img src="https://dlcdnwebimgs.asus.com/gain/F919198E-4F2B-4A8A-969A-E6E4757674AC/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">MOUSE</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
                        href="/monitor">
                        <img src="https://dlcdnwebimgs.asus.com/gain/718462E2-0FF1-424B-8070-9EE75A96DC64/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">MONITOR</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
                        href="/storage">
                        <img src="https://dlcdnwebimgs.asus.com/gain/D8D19FB9-2485-478F-9E58-4344265E0E69/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">STORAGE</p>
                    </Link>
                    <Link
                        className="h-full w-2/12 overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
                        href="/graphics-card">
                        <img src="https://dlcdnwebimgs.asus.com/gain/01480520-08BA-439E-A626-2E3D6F0D9908/w240/h175"
                             alt="image"
                             className="h-4/5 w-full"/>
                        <p className="h-1/5 text-center w-full text-2xl pt-2">GRAPHICS CARD</p>
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
                <ProductListComponent productData={laptopData.productSummaryDtoList} type={"laptop"} renderFromHomePage={true}/>
            </div>
            <div className="h-1/5 w-full">
                <ProductListComponent productData={headphoneData.productSummaryDtoList} renderFromHomePage={true}/>
            </div>
            <div className="h-1/5 w-full">
                <ProductListComponent productData={mouseData.productSummaryDtoList} renderFromHomePage={true}/>
            </div>

        </div>
    )
}
