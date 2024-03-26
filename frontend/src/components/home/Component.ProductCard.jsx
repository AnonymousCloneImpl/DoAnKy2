import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faDisplay, faHardDrive, faLaptop, faMemory, faMicrochip} from "@fortawesome/free-solid-svg-icons";
import FormatPrice from "@/components/FormatPrice";
import Image from "next/image";
import HandleCartClick from "@/components/HandleCardClick";

export default function ProductCardComponent({productData, type}) {
    if (productData !== null && productData !== [] && productData !== undefined) {
        if (type !== "laptop") {
            return (
                <div className="w-full grid grid-cols-5 max-md:grid-cols-2">
                    {productData.map((p) => (
                        <div key={p.id} className="w-full mt-3">
                            <div
                                className="rounded-lg bg-white mr-2 ml-2 homepage-card-item overflow-hidden"
                            >
                                <div className="h-6 relative ">
                                    <p className="bg-red-600 w-16 text-white text-center rounded-br-lg">-{p.discountPercentage}%</p>
                                </div>
                                <div className="h-52 w-full">
                                    <Link
                                        href={`/${p.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}
                                        className="w-full h-full flex justify-center items-center bg-white"
                                    >
                                        <Image
                                            src={p.image}
                                            width="200"
                                            height="100"
                                            style={{height: 'auto', width: 'auto'}}
                                            priority="high"
                                            alt="iamge"
                                        />
                                    </Link>
                                </div>
                                <div className="flex items-start pt-3 h-20 w-full">
                                    <Link
                                        className="h-full"
                                        href={`/${p?.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                                        <p className="pl-3 h-full w-full hover:text-blue-600">{p.name}</p>
                                    </Link>
                                </div>
                                <div className="div-price">
                                    <p className="price_discount w-full text-center"><FormatPrice
                                        price={p.price - (p.price * p.discountPercentage / 100)}/>đ</p>
                                    <p className="price w-full text-center"><FormatPrice price={p.price}/>đ</p>
                                </div>
                                <div className="w-full h-16 flex justify-center items-center mb-2">
                                    <button onClick={() => HandleCartClick({product: p})}
                                            className="h-3/4 rounded-md w-5/12 button-style">
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
                    ))}
                </div>
            )
        }
        return (
            <div className="w-full grid grid-cols-5 max-md:grid-cols-2">
                {productData.map((p) => (
                    <div key={p.id} className="w-full mt-3">
                        <div
                            className="rounded-lg bg-white  mr-2 ml-2 homepage-card-item overflow-hidden"
                        >
                            <div className="h-6 relative">
                                <p className="bg-red-600 w-16 text-white text-center rounded-br-lg">-{p.discountPercentage}%</p>
                            </div>
                            <div className="h-52 w-full">
                                <Link
                                    href={`/${p.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}
                                    className="w-full h-full flex justify-center items-center bg-white"
                                >
                                    <Image
                                        src={p.image}
                                        width="180"
                                        height="100"
                                        style={{height: 'auto', width: 'auto'}}
                                        priority="high"
                                        alt="iamge"
                                    />
                                </Link>
                            </div>
                            <div className="flex items-start pt-3 h-20 w-full">
                                <Link
                                    className="h-full"
                                    href={`/${p?.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                                    <p className="pl-3 h-full w-full hover:text-blue-600">{p.name}</p>
                                </Link>
                            </div>
                            <div className="div-price">
                                <p className="price_discount w-full text-center"><FormatPrice
                                    price={p.price - (p.price * p.discountPercentage / 100)}/>đ</p>
                                <p className="price w-full text-center"><FormatPrice price={p.price}/>đ</p>
                            </div>
                            <div
                                className="text-sm text-gray-600">
                                <div className="grid grid-cols-3">
                                    <div className="flex justify-center items-center">
                                        <FontAwesomeIcon icon={faMicrochip}/>
                                        <p className="pl-1">{p?.configuration?.cpuType}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <FontAwesomeIcon icon={faMemory}/>
                                        <p className="pl-1">{p?.configuration?.ram?.split(" ")[0]}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <FontAwesomeIcon icon={faDisplay}/>
                                        <p className="pl-1">{p?.configuration?.screenSize?.split(" ")[0] + "\""}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center mt-2 h-10">
                                    <Image src="/gpu.png"
                                           width="13" height="1" alt="gpu"
                                           className="pr-2"
                                           style={{width: "auto", height: "auto"}}
                                           priority="high"
                                    />
                                    <p>{p.configuration?.graphicsCard?.split(",")[0]}</p>
                                </div>
                            </div>
                            <div className="w-full h-16 flex justify-center items-center mb-2">
                                <button onClick={() => HandleCartClick({product: p})}
                                        className="h-3/4 rounded-md w-4/12 button-style">
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
                ))}
            </div>
        )

    }
    return (
        <div></div>
    )
}
