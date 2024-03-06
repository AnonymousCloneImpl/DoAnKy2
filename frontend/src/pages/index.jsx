import dotenv from 'dotenv';
import AnimationCarousel from "@/components/slider";
import Link from "next/link";
import useSWR from 'swr';
import fetcher from "@/utils/fetchAPI";
import ProductListComponent from "@/components/home/ProductList";
import Head from "next/head";
import CustomErrorPage from "@/pages/error";
import Image from "next/image";
import {useRouter} from "next/router";

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

        <div className="flex flex-wrap items-center justify-center">
            <Head>
                <title>
                    Welcome to Shop
                </title>
            </Head>
            <div className="w-full slider">
                <AnimationCarousel/>
            </div>

            <div className="w-full flex items-center justify-center mt-16">
                <div className="w-11/12 flex">
                    <div
                        style={{
                            height: '550px',
                            backgroundImage: 'url("https://images.acer.com/is/image/acer/predator-helios-16-ph16-72-perkey-backlit-on-wp-black-01-1?$Series-Component-XL$")',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className="w-1/3 bg-gray-100 relative ml-1 mr-1">
                        <div className="absolute bottom-12 left-10">
                            <p className="text-2xl h-16 flex items-center">
                                20% Off On Laptop
                            </p>
                            <p className="text-base flex flex-wrap w-5/6 h-16">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                            </p>
                            <Link
                                href=""
                                className="text-2xl w-1/3 h-10 flex flex-wrap bg-black hover:bg-gray-600"
                            >
                                <p className="w-full h-full flex items-center justify-center text-white">
                                    CHECK OUT
                                </p>
                            </Link>
                        </div>
                    </div>

                    <div
                        style={{
                            height: '550px',
                            backgroundImage: 'url("https://images.acer.com/is/image/acer/predator-helios-16-ph16-72-perkey-backlit-on-wp-black-01-1?$Series-Component-XL$")',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className="w-1/3 bg-gray-100 relative ml-1 mr-1">
                        <div className="absolute bottom-12 left-10">
                            <p className="text-2xl h-16 flex items-center">
                                20% Off On Laptop
                            </p>
                            <p className="text-base flex flex-wrap w-5/6 h-16">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                            </p>
                            <Link
                                href=""
                                className="text-2xl w-1/3 h-10 flex flex-wrap bg-black hover:bg-gray-600"
                            >
                                <p className="w-full h-full flex items-center justify-center text-white">
                                    CHECK OUT
                                </p>
                            </Link>
                        </div>
                    </div>

                    <div
                        style={{
                            height: '550px',
                            backgroundImage: 'url("https://images.acer.com/is/image/acer/predator-helios-16-ph16-72-perkey-backlit-on-wp-black-01-1?$Series-Component-XL$")',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className="w-1/3 bg-gray-100 relative ml-1 mr-1">
                        <div className="absolute bottom-12 left-10">
                            <p className="text-2xl h-16 flex items-center">
                                20% Off On Laptop
                            </p>
                            <p className="text-base flex flex-wrap w-5/6 h-16">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.
                            </p>
                            <Link
                                href=""
                                className="text-2xl w-1/3 h-10 flex flex-wrap bg-black hover:bg-gray-600"
                            >
                                <p className="w-full h-full flex items-center justify-center text-white">
                                    CHECK OUT
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-11/12 mb-10">
                <div className="h-20 flex flex-wrap items-center justify-center mb-10">
                    <p className="text-3xl w-full flex justify-center items-end mt-6">
                        NEW ARRIVAL
                    </p>
                    <span className="w-20 border border-b-black"></span>
                </div>
                <ProductListComponent productData={laptopData.productSummaryDtoList} type={"laptop"} renderFromHomePage={false}/>
            </div>


            {/* Khuyến Mãi */}
            <div className="w-11/12 h-96 flex flex-wrap justify-center items-center">
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
                            src="https://www.asus.com/media/Odin/Websites/vn/SiteSetting/20240102111438.jpg?webp"
                            className="w-full h-full"
                        />
                    </Link>
                </div>
            </div>

            {/* Product theo danh muc*/}
            <div className="h-1/4 w-full flex flex-wrap justify-center">
                <div className="h-20 w-full">
                    <p className="text-5xl w-full h-full flex items-center justify-center">
                        LAPTOP VĂN PHÒNG
                    </p>
                </div>
                <ProductListComponent productData={laptopData.productSummaryDtoList} type={"laptop"}
                                      renderFromHomePage={true}/>
            </div>

            <div className="h-1/4 w-11/12 flex flex-wrap justify-center mt-10">
                <div className="h-20 w-full">
                    <p className="text-5xl w-full h-full flex items-center justify-center">
                        HEADPHONE
                    </p>
                </div>
                <ProductListComponent productData={headphoneData.productSummaryDtoList} renderFromHomePage={true}/>
            </div>

            <div
                style={{
                    background: 'url("https://img.freepik.com/free-photo/illustration-geometric-shapes-with-neon-laser-lights-great-backgrounds-wallpapers_181624-32746.jpg?w=1380&t=st=1709695559~exp=1709696159~hmac=24682b09b7fad503170afeef1337f350ae462da4570ac7c0821cf36fd58f2db8")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                className="h-1/4 w-full flex flex-wrap justify-center mt-10">
                <div className="h-20 w-full">
                    <p className="text-white text-5xl w-full h-full flex items-center justify-center">
                        LAPTOP GAMING
                    </p>
                </div>
                <ProductListComponent productData={laptopData.productSummaryDtoList} type={"laptop"}
                                      renderFromHomePage={true}/>
            </div>

            <div className="h-1/4 w-11/12 flex flex-wrap justify-center mt-10">
                <div className="h-20 w-full">
                    <p className="text-5xl w-full h-full flex items-center justify-center">
                        MOUSE
                    </p>
                </div>
                <ProductListComponent productData={mouseData.productSummaryDtoList} renderFromHomePage={true}/>
            </div>

            <div className="category-hompage w-11/12 flex justify-center flex-wrap h-80">
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

        </div>
    )
}
