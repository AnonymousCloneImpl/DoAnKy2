import Link from "next/link";
import ProductCardComponent from "@/components/home/Component.ProductCard";

const ProductListComponent = ({ productData, renderFromHomePage, type, setCartNotifications }) => {
  if (renderFromHomePage) {
    return (
      <div
        className="flex h-full flex-wrap"
        style={{
          width: '98.8%'
        }}
      >
        <ProductCardComponent productData={productData} type={type}
          setCartNotifications={setCartNotifications} />
        <div className="w-full h-16 flex items-center justify-center">
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
      className="h-full"
      style={{
        width: '98.8%'
      }}
    >
      <ProductCardComponent productData={productData} type={type} setCartNotifications={setCartNotifications} />
    </div>
  );
};

export default ProductListComponent;
