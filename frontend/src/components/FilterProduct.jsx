import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMemory, faMicrochip, faMoneyBill} from "@fortawesome/free-solid-svg-icons";

const FilterProduct = ({type}) => {
    if (type.toLowerCase() === "laptop") {
        return (
            <div className="mt-3">
                <div className="flex justify-start items-center">
                    <div className="h-10 w-20 mr-5">
                        <button onClick={handlePriceClick}
                                className="h-full w-full rounded-md overflow-hidden bg-gray-300 flex justify-center items-center">
                            <FontAwesomeIcon className="w-2/6" icon={faMoneyBill}/>
                            <p className="h-full w-4/6 flex items-center">
                                Price
                            </p>
                        </button>
                    </div>
                    <div className="h-10 w-20 mr-5">
                        <button onClick={handleCpuClick}
                                className="h-full w-full rounded-md overflow-hidden bg-gray-300 flex justify-center items-center">
                            <FontAwesomeIcon className="w-2/6" icon={faMicrochip}/>
                            <p className="h-full w-4/6 flex items-center">
                                CPU
                            </p>
                        </button>
                    </div>
                    <div className="h-10 w-20 mr-5">
                        <button onClick={handleRamClick}
                                className="h-full w-full rounded-md overflow-hidden bg-gray-300 flex justify-center items-center">
                            <FontAwesomeIcon className="w-2/6" icon={faMemory}/>
                            <p className="h-full w-4/6 flex items-center">
                                RAM
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-3">
            <div className="flex justify-start items-center">
                <div className="h-10 w-20 mr-5">
                    <button onClick={handlePriceClick}
                            className="h-full w-full rounded-md overflow-hidden bg-gray-300 flex justify-center items-center">
                        <FontAwesomeIcon className="w-2/6" icon={faMoneyBill}/>
                        <p className="h-full w-4/6 flex items-center">
                            Price
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FilterProduct;