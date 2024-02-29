import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import FormatPrice from "@/components/FormatPrice";


export default function ProductCardComponent({productData}) {
    console.log(productData)
    if (productData !== null && productData !== [] && productData !== undefined) {
        return (
            <div className="h-full w-full flex">
                {productData.map((product) => (
                    <div key={product.id} className="w-1/5 mb-10">
                        <div
                            className="bg-white rounded-lg homepage-card-item ml-2 mr-2 overflow-hidden transition-transform transform hover:scale-105 hover:transition-transform hover:duration-500 hover:homepage-card-item"
                        >
                            <div className="w-full h-6 flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-lg rounded-bl-lg">-{product.discountPercentage}%</p>
                            </div>
                            <div className="h-60 w-full">
                                <Link
                                    href={`/${product.type.toLowerCase()}/${product.name.toLowerCase().replace(/\s/g, "-")}`}
                                    className="w-full h-full flex justify-center items-center"
                                >
                                    <img
                                        src={product.image}
                                        className="h-full"
                                    />
                                </Link>
                            </div>
                            <div className="flex items-center pt-3 h-20 w-full">
                                <Link
                                    href={`/${product.type.toLowerCase()}/${product.name.toLowerCase().replace(/\s/g, "-")}`}>
                                    <p className="pl-3 h-full w-full">{product.name}</p>
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <p className="price_discount pl-3"><FormatPrice price={product.price - (product.price * product.discountPercentage / 100)} />đ</p>
                                <p className="price"><FormatPrice price={product.price} />đ</p>
                            </div>
                            <div className="w-full h-16 flex space-x-4 justify-center items-center">
                                <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                    <div>
                                        <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div></div>
    )
}