import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import ProductCardComponent from "@/components/home/Component.ProductCard";

const ProductListComponent = ({productData}) => {
    return (
        <div className="flex h-full w-full flex-wrap">
                <div className="h-1/5 w-full flex items-center">
                    <div className="w-full h-1/2 flex justify-between items-center">
                        <p className="text-3xl pl-8 w-2/12">{productData[0].type}</p>
                        <Link href={productData[0].type} className="pl-8 w-2/12">Xem thêm&gt;&gt;</Link>
                    </div>
                </div>
                <ProductCardComponent productData={productData} />
            </div>
    );
};

export default ProductListComponent;