import dotenv from 'dotenv';
import AnimationCarousel from "@/components/slider";
import Link from "next/link";
import useSWR from 'swr';
import fetcher from "@/utils/fetchAPI";
import ProductListComponent from "@/components/home/ProductList";
import Head from "next/head";
import CustomErrorPage from "@/pages/error";
import { useState } from "react";
import CartNotification from "@/components/CartNotification";
import Loading from "@/components/Loading";

dotenv.config();

export default function Home() {
  const [cartNotifications, setCartNotifications] = useState([]);

  const laptopApi = `${process.env.DOMAIN}/products/laptop?limit=5`;
  const headphoneApi = `${process.env.DOMAIN}/products/headphone?limit=5`;
  const mouseApi = `${process.env.DOMAIN}/products/mouse?limit=5`;

  const { data: laptopData, isLoading: loading, error: laptopError } = useSWR(laptopApi, fetcher);
  const { data: headphoneData, isLoading: loading2, error: headphoneError } = useSWR(headphoneApi, fetcher);
  const { data: mouseData, isLoading: loading3, error: mouseError } = useSWR(mouseApi, fetcher);

  if (laptopError || headphoneError || mouseError) return <CustomErrorPage statusCode="404" />;

  if (laptopError === [] || headphoneError === [] || mouseError === []) return <CustomErrorPage statusCode="404" />;

  if (loading || loading2 || loading3) return <Loading />;

  return (

    <div className="flex flex-wrap items-center justify-center">
      <Head>
        <title>
          Welcome to Shop
        </title>
      </Head>
      <div className="w-full slider">
        <AnimationCarousel />
      </div>

      <div
        className="mb-10 mt-10 pb-6 flex flex-wrap justify-center rounded-2xl"
        style={{
          background: 'linear-gradient(rgb(0, 0, 0), rgb(138, 5, 5)) 0% 0% / cover',
          width: '95%'
        }}
      >
        <div className="h-20 flex flex-wrap items-center justify-center mb-3">
          <p className="text-5xl w-full flex justify-center items-end text-white">
            NEW ARRIVAL
          </p>
          <span className="w-32 border border-b-black"></span>
        </div>
        <ProductListComponent productData={laptopData.productSummaryDtoList}
          type={"laptop"}
          renderFromHomePage={false}
          setCartNotifications={setCartNotifications}
        />
      </div>

      {/* Khuyến Mãi */}
      <div
        className="mb-10"
        style={{
          width: '95%'
        }}
      >
        <div className="w-full h-3/5 grid grid-cols-3 gap-2 max-md:grid-cols-1 max-md:grid-rows-3">
          <Link href="" className="">
            <img
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/SIS%20asus.png"
              className="w-full h-full rounded-2xl"
              loading={"lazy"}
              alt=""/>
          </Link>
          <Link href="" className="">
            <img
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/laptop-hssv-sliding-2024.jpg"
              className="w-full h-full rounded-2xl"
              loading={"lazy"}
              alt={""}/>
          </Link>
          <Link href="" className="">
            <img
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/uu-dai-vppay-apple-080324%20(2).png"
              className="w-full h-full rounded-2xl"
              loading={"lazy"}
              alt={""}/>
          </Link>
        </div>
      </div>

      {/* Product theo danh muc*/}
      <div
        className="h-1/4 flex flex-wrap justify-center rounded-2xl"
        style={{
          background: 'linear-gradient(rgb(0, 0, 0), rgb(138, 5, 5)) 0% 0% / cover',
          width: '95%'
        }}
      >
        <div className="h-20 w-full mt-5 flex flex-wrap justify-center">
          <p className="text-5xl w-full text-center text-white">
            OFFICE LAPTOP
          </p>
          <span className="w-48 h-0 border border-t-black"></span>
        </div>
        <ProductListComponent productData={laptopData.productSummaryDtoList}
          type={"laptop"}
          renderFromHomePage={true}
          setCartNotifications={setCartNotifications}
        />
      </div>

      <div
        className="h-1/4 flex flex-wrap justify-center mt-10 rounded-2xl"
        style={{
          background: 'linear-gradient(rgb(0, 0, 0), rgb(138, 5, 5)) 0% 0% / cover',
          width: '95%'
        }}
      >
        <div className="h-20 w-full mt-5 flex flex-wrap justify-center">
          <p className="text-5xl w-full text-center text-white">
            LAPTOP GAMING
          </p>
          <span className="w-36 h-0 border border-t-black"></span>
        </div>
        <ProductListComponent productData={laptopData.productSummaryDtoList}
          type={"laptop"}
          renderFromHomePage={true}
          setCartNotifications={setCartNotifications}
        />
      </div>

      <div
        className="mt-10 grid grid-cols-3 gap-2 max-md:flex max-md:flex-wrap"
        style={{
          width: '95%'
        }}
      >
        <Link href={'/'} className="col-span-2">
          <img
            className="rounded-2xl h-full"
            src={'https://file.hstatic.net/200000722513/file/1580x510_man_hinh_thang_03_435810e7223043ec866bd0ed8dc1cf09.png'}
            loading={"lazy"}
            alt={""}/>
        </Link>
        <div className="col-span-1 grid grid-rows-2 gap-2">
          <Link href={'/'} className="">
            <img
              className="rounded-2xl h-full w-full"
              src={'https://file.hstatic.net/200000722513/file/banner_790x250_tai_nghe_6f6dcb17d3a54fcc88b3de96762d2d41.jpg'}
              loading={"lazy"}
              alt={""}/>
          </Link>
          <Link href={'/'}>
            <img
              className="rounded-2xl h-full w-full"
              src={'https://file.hstatic.net/200000722513/file/bot_promotion_banner_small_2_2ad55c2345c64fbfb87dab4957b33914.png'}
              loading={"lazy"}
              alt={""}/>
          </Link>
        </div>
      </div>

      {/*HEADPHONE*/}
      <div
        className="h-1/4 flex flex-wrap justify-center mt-10 rounded-2xl bg-custom"
        style={{
          width: '95%'
        }}
      >
        <div className="h-20 w-full flex flex-wrap justify-center mt-5">
          <p className="text-5xl w-full text-center text-white">
            HEADPHONE
          </p>
          <span className="w-36 h-0 border border-t-black"></span>
        </div>
        <ProductListComponent productData={headphoneData.productSummaryDtoList}
          renderFromHomePage={true}
          setCartNotifications={setCartNotifications}
        />
      </div>

      <div
        className="h-1/4 flex flex-wrap justify-center mt-10 rounded-2xl bg-transparent bg-custom"
        style={{
          width: '95%'
        }}
      >
        <div className="h-20 w-full flex flex-wrap justify-center mt-5">
          <p className="text-5xl w-full text-center text-white">
            MOUSE
          </p>
          <span className="w-20 h-0 border border-t-black"></span>
        </div>
        <ProductListComponent productData={mouseData.productSummaryDtoList}
          renderFromHomePage={true}
          setCartNotifications={setCartNotifications}
        />
      </div>

      <div className="category-hompage w-full flex justify-center flex-wrap pb-4 mt-10 rounded-xl"
        style={{
          background: '#FBC303',
          width: '95%'
      }}>
        <div className="w-full">
          <div className="w-full flex items-center justify-center">
            <p className="text-center w-full p-5 text-5xl max-md:text-3xl">
              DANH MỤC NỔI BẬT
            </p>
          </div>
        </div>
        <div className="w-11/12 grid grid-cols-6 gap-2 max-md:grid-cols-3">
          <Link
            className="overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
            href={"/laptop"}>
            <img src="https://dlcdnwebimgs.asus.com/gain/868C3307-DD02-4624-8BA7-31B62EE4A38F/w240/h175"
              alt="image"
              className="w-full"
              loading={"lazy"}
            />
            <p className="h-1/5 text-center w-full text-2xl max-md:text-xl">LAPTOP</p>
          </Link>
          <Link
            className="overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
            href={"/headphone"}>
            <img src="https://dlcdnwebimgs.asus.com/gain/070A915A-ED63-4C9E-B837-F6F1766E2863/w240/h175"
              alt="image"
              className="w-full"
              loading={"lazy"}
            />
            <p className="h-1/5 text-center w-full text-2xl max-md:text-xl">HEADPHONE</p>
          </Link>
          <Link
            className="overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
            href={"/mouse"}>
            <img src="https://dlcdnwebimgs.asus.com/gain/F919198E-4F2B-4A8A-969A-E6E4757674AC/w240/h175"
              alt="image"
              className="w-full"
              loading={"lazy"}
            />
            <p className="h-1/5 text-center w-full text-2xl max-md:text-xl">MOUSE</p>
          </Link>
          <Link
            className="overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
            href={"/monitor"}>
            <img src="https://dlcdnwebimgs.asus.com/gain/718462E2-0FF1-424B-8070-9EE75A96DC64/w240/h175"
              alt="image"
              className="w-full"
              loading={"lazy"}
            />
            <p className="h-1/5 text-center w-full text-2xl max-md:text-xl">MONITOR</p>
          </Link>
          <Link
            className="overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
            href={"/storage"}>
            <img src="https://dlcdnwebimgs.asus.com/gain/D8D19FB9-2485-478F-9E58-4344265E0E69/w240/h175"
              alt="image"
              className="w-full"
              loading={"lazy"}
            />
            <p className="h-1/5 text-center w-full text-2xl max-md:text-xl">STORAGE</p>
          </Link>
          <Link
            className="overflow-hidden transition-transform transform hover:scale-110 hover:transition-transform hover:duration-500 rounded-md"
            href={"/graphics-card"}>
            <img src="https://dlcdnwebimgs.asus.com/gain/01480520-08BA-439E-A626-2E3D6F0D9908/w240/h175"
              alt="image"
              className="w-full"
              loading={"lazy"}
            />
            <p className="h-1/5 text-center w-full text-2xl max-md:text-xl">GRAPHICS CARD</p>
          </Link>
        </div>
      </div>

      <CartNotification cartNotifications={cartNotifications} />

    </div>
  )
}
