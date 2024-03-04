import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import ProductCardComponent from "@/components/home/Component.ProductCard";

const ProductListComponent = ({productData, renderFromHomePage, type}) => {
    if (renderFromHomePage) {
        return (
            <div className="flex h-full w-full flex-wrap border-t border-b mb-16">
                <div className="w-full flex items-center">
                    <div className="w-full h-28 flex justify-between items-center">
                        <p className="text-3xl uppercase pl-3 w-full text-center">{productData[0]?.type}</p>
                    </div>
                </div>
                <ProductCardComponent productData={productData} type={type} />
                <div className="w-full h-16 flex items-center">
                    <Link href={productData[0]?.type.toLowerCase() || "/"} className="w-full text-center">Xem tất cả&gt;&gt;</Link>
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