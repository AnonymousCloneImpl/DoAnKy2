import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faDisplay, faMemory, faMicrochip} from "@fortawesome/free-solid-svg-icons";
import FormatPrice from "@/components/FormatPrice";
import Image from "next/image";
import HandleCartClick from "@/components/HandleCartClick";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductCardComponent({productData, setCartNotifications, needSlider}) {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    initialSlide: 0,
    swipe: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 4,
          swipe: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          swipe: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          swipe: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          swipe: true,
        }
      }
    ]
  };

  const ProductRender = ({product}) => {
    return (
      <div className="w-full mt-3">
        <div className="rounded-lg bg-white mr-2 ml-2 homepage-card-item overflow-hidden">
          <div className="h-6 relative">
            <p className="bg-red-600 w-16 text-white text-center rounded-br-lg">-{product.discountPercentage}%</p>
          </div>
          <div className="h-52 w-full max-lg:h-40">
            <Link
              href={`/${product.type.toLowerCase()}/${product?.name?.toLowerCase().replace(/\s/g, "-")}?model=${product.model.toLowerCase().replace(/\s/g, "-")}`}
              className="flex items-center justify-center w-full h-full"
            >
              <div
                style={{
                  height: '100%',
                  width: '80%',
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </Link>
          </div>
          <div className="flex items-start pt-3 w-full productNameSize">
            <Link
              href={`/${product.type.toLowerCase()}/${product?.name?.toLowerCase().replace(/\s/g, "-")}?model=${product.model.toLowerCase().replace(/\s/g, "-")}`}
              className="flex items-center justify-center w-full h-full"
            >
              <p className="pl-3 h-full w-full font-bold hover:text-blue-600">{product.name + " " + product.model}</p>
            </Link>
          </div>
          <div className="div-price justify-around">
            <FormatPrice
              price={product.price - (product.price * product.discountPercentage / 100)}
              type="discount"/>
            <FormatPrice price={product.price}/>
          </div>
          {product.type.toLowerCase() === "laptop" && (
            <div className="text-sm text-gray-600 mt-3 flex justify-center flex-wrap">
              <div
                className="grid grid-cols-3"
                style={{
                  width: '98%'
                }}
              >
                <div className="inline-grid justify-items-center">
                  <FontAwesomeIcon icon={faMicrochip}/>
                  <p>{product?.productDetails?.cpuType}</p>
                </div>
                <div className="inline-grid justify-items-center">
                  <FontAwesomeIcon icon={faMemory}/>
                  <p>{product?.productDetails?.ram?.split(" ")[0]}</p>
                </div>
                <div className="inline-grid justify-items-center">
                  <FontAwesomeIcon icon={faDisplay}/>
                  <p>{product?.productDetails?.screenSize?.replace(" inches", "\"")}</p>
                </div>
              </div>
              <div
                className="flex justify-center items-center gpu mt-3"
                style={{
                  width: '95%'
                }}
              >
                <Image
                  src="/gpu.png"
                  width="13" height="1" alt="gpu"
                  className="pr-2"
                  style={{width: "auto", height: "auto"}}
                  priority="high"
                />
                <p>{product.productDetails?.gpu?.split(",")[0]}</p>
              </div>
            </div>
          )}
          <div className="w-full h-16 flex justify-center items-center mb-2 mt-3">
            <button
              onClick={() => HandleCartClick({
                product: product,
                setCartNotifications: setCartNotifications
              })}
              className="h-3/4 rounded-md w-4/12 button-style"
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                className="icon-style"
                style={{
                  transition: 'color 0.3s ease',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (productData === undefined) {
    return (
      <div>
        <p>
          No Product Found
        </p>
      </div>
    )
  }

  return needSlider ? (
    <div>
      <Slider {...settings}>
        {productData.map((p) => (
          <ProductRender product={p} key={p.id} />
        ))}
      </Slider>
    </div>
  ) : (
    <div className="grid grid-cols-5 max-sm:grid-cols-2 max-lg:grid-cols-3 max-md:grid-cols-3 max-xl:grid-cols-4">
      {productData.map((p) => (
        <ProductRender product={p} key={p.id} />
      ))}
    </div>
  );
}
