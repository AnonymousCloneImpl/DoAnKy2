import Link from "next/link";
import ProductCardComponent from "@/components/home/Component.ProductCard";

const ProductListComponent = ({productData, renderFromHomePage, type}) => {
    if (renderFromHomePage) {
        return (
            <div className="flex h-full w-11/12 flex-wrap rounded-lg">
                <ProductCardComponent productData={productData} type={type} />
                <div className="w-full h-20 flex items-center justify-center">
                    <Link href={productData[0]?.type.toLowerCase() || "/"} className="w-1/6 text-center">Xem tất cả&gt;&gt;</Link>
                </div>
            </div>
        );
    }
    return (
        <div className="flex h-full w-full flex-wrap">
            <ProductCardComponent productData={productData} type={type} />
        </div>
    );
};

export default ProductListComponent;