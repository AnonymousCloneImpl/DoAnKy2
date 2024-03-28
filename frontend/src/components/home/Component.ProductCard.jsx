import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus, faDisplay, faHardDrive, faLaptop, faMemory, faMicrochip} from "@fortawesome/free-solid-svg-icons";
import FormatPrice from "@/components/FormatPrice";
import Image from "next/image";
import HandleCartClick from "@/components/HandleCardClick";

export default function ProductCardComponent({productData, type}) {
    if (productData !== null && productData !== [] && productData !== undefined) {
        return (
            <div className="w-full grid grid-cols-5 productList">
                {productData.map((p) => {
                    if (p.type.toLowerCase() !== "laptop") {
                        return (
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
                                            className="flex items-center justify-center w-full h-full"
                                        >
                                            <div
                                                style={{
                                                    height: '80%',
                                                    width: '80%',
                                                    backgroundImage: `url(${p.image})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            ></div>
                                        </Link>
                                    </div>
                                    <div className="flex items-start pt-3 h-20 w-full">
                                        <Link
                                            className="h-full"
                                            href={`/${p?.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                                            <p className="pl-3 h-full w-full hover:text-blue-600">{p.name}</p>
                                        </Link>
                                    </div>
                                    <div className="div-price flex justify-around">
                                        <FormatPrice price={p.price - (p.price * p.discountPercentage / 100)}
                                                     type="discount"/>
                                        <FormatPrice price={p.price}/>
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
                        )
                    }
                    return (
                        <div key={p.id} className="w-full mt-3">
                            <div
                                className="rounded-lg bg-white mr-2 ml-2 homepage-card-item overflow-hidden"
                            >
                                <div className="h-6 relative">
                                    <p className="bg-red-600 w-16 text-white text-center rounded-br-lg">-{p.discountPercentage}%</p>
                                </div>
                                <div className="h-52 w-full">
                                    <Link
                                        href={`/${p.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}
                                        className="flex items-center justify-center w-full h-full"
                                    >
                                        <div
                                            style={{
                                                height: '80%',
                                                width: '80%',
                                                backgroundImage: `url(${p.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        ></div>
                                    </Link>
                                </div>
                                <div className="flex items-start pt-3 w-full productNameSize">
                                    <Link
                                        href={`/${p?.type.toLowerCase()}/${p.name.toLowerCase().replace(/\s/g, "-")}`}>
                                        <p className="pl-3 h-full w-full hover:text-blue-600">{p.name}</p>
                                    </Link>
                                </div>
                                <div className="div-price justify-around">
                                    <FormatPrice price={p.price - (p.price * p.discountPercentage / 100)}
                                                 type="discount"/>
                                    <FormatPrice price={p.price}/>
                                </div>
                                <div className="text-sm text-gray-600 mt-3 flex justify-center flex-wrap">
                                    <div className="grid grid-cols-3"
                                         style={{
                                             width: '90%'
                                         }}
                                    >
                                        <div className="inline-grid justify-items-center">
                                            <FontAwesomeIcon icon={faMicrochip}/>
                                            <p>{p?.configuration?.cpuType}</p>
                                        </div>
                                        <div className="inline-grid justify-items-center">
                                            <FontAwesomeIcon icon={faMemory}/>
                                            <p>{p?.configuration?.ram?.split(" ")[0]}</p>
                                        </div>
                                        <div className="inline-grid justify-items-center">
                                            <FontAwesomeIcon icon={faDisplay}/>
                                            <p>{p?.configuration?.screenSize?.split(" ")[0] + "\""}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center gpu mt-3"
                                         style={{
                                             width: '95%'
                                         }}
                                    >
                                        <Image src="/gpu.png"
                                               width="13" height="1" alt="gpu"
                                               className="pr-2"
                                               style={{width: "auto", height: "auto"}}
                                               priority="high"
                                        />
                                        <p>{p.configuration?.graphicsCard?.split(",")[0]}</p>
                                    </div>
                                </div>
                                <div className="w-full h-16 flex justify-center items-center mb-2 mt-3">
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
                    )
                })}
            </div>
        )
    }
    return (
        <div></div>
    )
}
