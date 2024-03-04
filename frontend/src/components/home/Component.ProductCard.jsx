import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faDisplay, faHardDrive, faLaptop, faMemory, faMicrochip} from "@fortawesome/free-solid-svg-icons";
import FormatPrice from "@/components/FormatPrice";
import Image from "next/image";
import AddToCard from "@/components/addToCard";
import {useRouter} from "next/router";

export default function ProductCardComponent({productData, type}) {
    const { query } = useRouter();

    if (productData !== null && productData !== [] && productData !== undefined) {
        if (query.type === "laptop") {
            return (
                <div className="w-full flex">
                    {productData.map((p) => (
                        <div key={p.id} className="w-1/5">
                            <div
                                className="bg-white rounded-lg homepage-card-item ml-2 mr-2 overflow-hidden transition-transform transform hover:scale-105 hover:transition-transform hover:duration-500 hover:homepage-card-item"
                            >
                                <div className="w-full h-6 flex justify-end">
                                    <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-lg rounded-bl-lg">-{p.discountPercentage}%</p>
                                </div>
                                <div className="h-40 w-full">
                                    <Link
                                        href={`/${p.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}
                                        className="w-full h-full flex justify-center items-center"
                                    >
                                        <img
                                            src={p.image}
                                            className="h-full"
                                        />
                                    </Link>
                                </div>
                                <div className="flex items-center pt-3 h-20 w-full">
                                    <Link
                                        href={`/${p.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                                        <p className="pl-3 h-full w-full">{p.name}</p>
                                    </Link>
                                </div>
                                <div
                                    className="flex flex-wrap justify-around items-center text-sm text-gray-600">
                                    <div className="flex justify-center items-center">
                                        <FontAwesomeIcon icon={faMicrochip}/>
                                        <p className="pl-1">{p.configuration.cpu_type}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <FontAwesomeIcon icon={faMemory}/>
                                        <p className="pl-1">{p.configuration.ram.split(" ")[0]}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <FontAwesomeIcon icon={faDisplay}/>
                                        <p className="pl-1">{p.configuration.screenSize.split(" ")[0] + "\""}</p>
                                    </div>
                                    <div className="flex justify-center items-center mt-2">
                                        <Image src="/gpu.png"
                                               width="13" height="1" alt="gpu"
                                               className="pr-2"
                                               style={{ width: "auto", height: "auto"}}
                                        />
                                        <p>{p.configuration.graphicsCard.split(",")[0]}</p>
                                    </div>
                                </div>
                                <div className="flex items-center h-16">
                                    <p className="price_discount pl-3"><FormatPrice
                                        price={p.price - (p.price * p.discountPercentage / 100)}/>đ</p>
                                    <p className="price"><FormatPrice price={p.price} />đ</p>
                                </div>
                                <div className="w-full h-16 flex space-x-4 justify-center items-center">
                                    <button onClick={() => AddToCard({ product: p })}
                                            className="bg-white h-3/4 rounded-md w-5/12 border border-red-600">
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
            <div className="w-full flex">
                {productData.map((p) => (
                    <div key={p.id} className="w-1/5">
                        <div
                            className="bg-white rounded-lg homepage-card-item ml-2 mr-2 overflow-hidden transition-transform transform hover:scale-105 hover:transition-transform hover:duration-500 hover:homepage-card-item"
                        >
                            <div className="w-full h-6 flex justify-end">
                                <p className="bg-red-600 text-white w-1/4 text-center rounded-tr-lg rounded-bl-lg">-{p.discountPercentage}%</p>
                            </div>
                            <div className="h-40 w-full">
                                <Link
                                    href={`/${p.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}
                                    className="w-full h-full flex justify-center items-center"
                                >
                                    <img
                                        src={p.image}
                                        className="h-full"
                                    />
                                </Link>
                            </div>
                            <div className="flex items-center pt-3 h-20 w-full">
                                <Link
                                    href={`/${p.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                                    <p className="pl-3 h-full w-full">{p.name}</p>
                                </Link>
                            </div>
                            <div className="flex items-center h-16">
                                <p className="price_discount pl-3"><FormatPrice
                                    price={p.price - (p.price * p.discountPercentage / 100)}/>đ</p>
                                <p className="price"><FormatPrice price={p.price}/>đ</p>
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