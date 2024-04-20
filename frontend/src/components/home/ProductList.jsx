import Link from "next/link";
import ProductCardComponent from "@/components/home/Component.ProductCard";

const ProductListComponent = ({ productData, renderFromHomePage, type, setCartNotifications, needSlider }) => {
  if (renderFromHomePage) {
    return (
      <div
        className="h-full"
        style={{
          width: '98.8%'
        }}
      >
        <ProductCardComponent
          productData={productData}
          type={type}
          needSlider={needSlider}
          setCartNotifications={setCartNotifications}
        />
        <div className="w-full h-16 flex items-center justify-center mt-5">
          <Link href={productData[0]?.type.toLowerCase() || "/"}
            className="bg-white flex justify-center items-center rounded-2xl transition duration-100 ease-in-out transform hover:font-bold watch-more"
            style={{
              width: '10%',
              height: '60%'
            }}
          >
            Xem tất cả&gt;&gt;
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div
      className="h-full mt-5"
      style={{
        width: '98.8%'
      }}
    >
      <ProductCardComponent productData={productData} type={type} setCartNotifications={setCartNotifications} needSlider={needSlider} />
    </div>
  );
};

export default ProductListComponent;
