import Link from "next/link";
import ProductCardComponent from "@/components/home/Component.ProductCard";

const ProductListComponent = ({productData, renderFromHomePage, type}) => {
    if (renderFromHomePage) {
        return (
            <div
                className="flex h-full flex-wrap"
                style={{
                    width: '96%'
                }}
            >
                <ProductCardComponent productData={productData} type={type} />
                <div className="w-full h-16 flex items-center justify-center text-white">
                    <Link href={productData[0]?.type.toLowerCase() || "/"} className="w-1/6 text-center">Xem tất cả&gt;&gt;</Link>
                </div>
            </div>
        );
    }
    return (
        <div
            className="h-full"
            style={{
                width: '96%'
            }}
        >
            <ProductCardComponent productData={productData} type={type} />
        </div>
    );
};

export default ProductListComponent;