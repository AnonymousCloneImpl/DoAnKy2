import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faCreditCard} from "@fortawesome/free-solid-svg-icons";

const HomeComponent = ({productData}) => {
    return (
        <div className="block-products flex justify-center h-full">
            <div className="w-10/12 h-full">
                <div className="h-1/5 w-full flex items-center">
                    <div className="w-full h-1/2 flex justify-between items-center">
                        <p className="text-3xl pl-8 w-2/12">{productData[0].type}</p>
                        <Link href={"/products/" + productData[0].type} className="pl-8 w-2/12">Xem thêm</Link>
                    </div>
                </div>
                <div className="h-4/5 w-full flex">
                    {productData.map((product) => (
                        <div
                            className="w-1/5 h-full rounded-md homepage-card-item ml-2 mr-2 overflow-hidden transition-transform transform hover:scale-105 hover:transition-transform hover:duration-500 hover:homepage-card-item"
                            key={product.id}
                        >
                            <div className="w-full h-6 flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-md">-{product.discountPercentage}%</p>
                            </div>
                            <div className="h-3/6 w-full">
                                <img
                                    src={product.image}
                                    className="h-full w-full"
                                />
                            </div>
                            <div className="flex items-center pt-3 h-1/6 w-full">
                                <p className="pl-3 h-full w-full">{product.name}</p>
                            </div>
                            <div className="flex items-center">
                                <p className="price_discount pl-3">{product.price - (product.price * product.discountPercentage / 100)}đ</p>
                                <p className="price">{product.price}đ</p>
                            </div>
                            <div className="w-full h-1/6 flex space-x-4 justify-center items-center">
                                <button className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
                                    <div>
                                        <FontAwesomeIcon icon={faCartPlus} className="text-red-600"/>
                                    </div>
                                </button>
                                <button className="text-white h-3/4 rounded-md bg-red-600 w-5/12">
                                    <div>
                                        <FontAwesomeIcon icon={faCreditCard}/> Buy Now
                                    </div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;