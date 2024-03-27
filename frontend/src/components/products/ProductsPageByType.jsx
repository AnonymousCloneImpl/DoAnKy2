
import ProductCardComponent from "@/components/home/Component.ProductCard";
import {getTrackBackground, Range} from "react-range";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ProductList from "@/components/home/ProductList";
import FormatPrice from "@/components/FormatPrice";
import {faFilter, faMemory, faMicrochip, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProductsPageByType = ({ pageData, page, pageType, staticData }) => {
    const router = useRouter();
    const {query} =  useRouter();
    const [showPriceInput, setShowPriceInput] = useState(false);
    const [showCpuOption, setShowCpuOption] = useState(false);
    const [showRamOption, setShowRamOption] = useState(false);
    // Data for render
    const [products, setProducts] = useState([]);
    const [producers, setProducers] = useState([]);
    const [topSeller, setTopSeller] = useState([]);
    const [cpuFilter, setCpuFilter] = useState([]);
    const [ramFilter, setRamFilter] = useState([]);

    // Paging
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [elementPerPage, setElementPerPage] = useState();
    const [totalElement, setTotalElement] = useState();

    // Param
    const [minPrice, setMinPrice] = useState(query.minPrice || 0);
    const [maxPrice, setMaxPrice] = useState(query.maxPrice || 200000000);

    // init data
    useEffect(() => {
        if (pageData.productSummaryDtoList) {
            setProducts(pageData.productSummaryDtoList);
        }

        if (pageData.totalPageNumber) {
            setTotalPage(pageData.totalPageNumber);
        }

        if (pageData.elementPerPage) {
            setElementPerPage(pageData.elementPerPage);
        }

        if (pageData.totalElement) {
            setTotalElement(pageData.totalElement);
        }

        if (pageData.producerList) {
            setProducers(pageData.producerList);
        }

        if (staticData) {
            setTopSeller(staticData.productSummaryDtoList);
            setProducers(staticData.producerList);
            if (pageType?.toLowerCase() === 'laptop') {
                setCpuFilter(staticData.cpuList);
                setRamFilter(staticData.ramList);
            }
        }

        setCurrentPage(page);
    }, [page, pageData, pageType, staticData]);

    const handleCpuClick = async () => {
        if (showRamOption) {
            setShowRamOption(!showRamOption);
        }
        if (showPriceInput) {
            setShowPriceInput(!showPriceInput);
        }
        setShowCpuOption(!showCpuOption);
    };

    const handleRamClick = async () => {
        if (showCpuOption) {
            setShowCpuOption(!showCpuOption);
        }
        if (showPriceInput) {
            setShowPriceInput(!showPriceInput);
        }
        setShowRamOption(!showRamOption);
    };

    const handlePriceClick = () => {
        if (showCpuOption) {
            setShowCpuOption(!showCpuOption);
        }
        if (showRamOption) {
            setShowRamOption(!showRamOption);
        }
        setShowPriceInput(!showPriceInput);
    };

    const handleProducerClick = async ({name}) => {
        await new Promise((resolve) => {
            router.push({ pathname: router.pathname, query: { ...query, producer: name } }, undefined, { shallow: true, scroll: false, });
            resolve();
        });
        if (query.producer === name) {
            const { producer, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
        } else {
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, producer: name } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
    };

    const handleCpuTypeClick = async ({value}) => {
        value = value.replace(" ", "-");
        setShowCpuOption(false);
        if (query.cpu === value) {
            const { cpu, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
        } else {
            if (query.cpu) {
                const { cpu, ...newQuery } = query;
                await new Promise((resolve) => {
                    router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                    resolve();
                });
            }
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, cpu: value } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
    };

    const handleRamTypeClick = async ({value}) => {
        setShowRamOption(false);
        if (query.ram === value) {
            const { ram, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
        } else {
            if (query.ram) {
                const { ram, ...newQuery } = query;
                await new Promise((resolve) => {
                    router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                    resolve();
                });
            }
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, ram: value } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
    };

    const handleApplyPriceFilter = async () => {
        await new Promise((resolve) => {
            router.push({
                pathname: router.pathname,
                query: {
                    ...query,
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || undefined,
                }},
                undefined,
                { shallow: true, scroll: false, }
            );
            resolve();
        });
        setShowPriceInput(!showPriceInput);
    };

    const handlePageButtonClick = async (value) => {
        const newQuery = { ...query, page: value };

        setCurrentPage(value);

        await new Promise((resolve) => {
            router.replace(
                {
                    pathname: router.pathname,
                    query: newQuery,
                },
                undefined,
                { shallow: true, scroll: false}
            );
            resolve();
        })
    };

    return (
        <div style={{
            margin: "auto",
            width: '95%'
        }}
            className="h-full"
        >
            <div>
                <p>This should be small slider</p>
            </div>

            <div className="h-auto mt-10 bg-gray-300">
                <div className="h-24">
                    <p className="h-full w-full flex justify-center items-center text-5xl">
                        TOP SELLER
                    </p>
                </div>
                <div className="mb-8">
                    <ProductCardComponent productData={topSeller} type={"laptop"}/>
                </div>
                <div className="h-3">

                </div>
            </div>

            <div className="mt-8">
                <div className="text-2xl">
                    <p className="h-10">CHUYÊN TRANG THƯƠNG HIỆU</p>
                </div>
                <div className="w-full mt-3">
                    <ul className="grid grid-cols-12 max-md:grid-cols-6 max-sm:grid-cols-4">
                        {producers.map((producer) => (
                            <li key={producer.id} className="h-8 w-36 mb-3">
                                <div className="h-full">
                                    <button className="h-full w-1/2 border border-black rounded-md overflow-hidden flex justify-center items-center"
                                            onClick={() => handleProducerClick({ name: producer.name.toLowerCase() })}
                                    >
                                        <img
                                            src={`${producer.image}`}
                                            className="h-4/6 w-11/12"
                                        />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* FILTER */}
            <div className="mt-6">
                <div className="text-xl flex items-center">
                    <FontAwesomeIcon className="text-lg mr-1" icon={faFilter}/>
                    FILTER
                </div>
                <div className="mt-3">
                    <div className="flex justify-start items-center">
                        <div className="h-10 w-20 mr-5">
                            <button onClick={handlePriceClick}
                                    className="h-full w-full rounded-md overflow-hidden bg-gray-200 hover:bg-gray-400 flex justify-center items-center">
                                <FontAwesomeIcon className="w-2/6" icon={faMoneyBill}/>
                                <p className="h-full w-4/6 flex items-center">
                                    Price
                                </p>
                            </button>
                        </div>
                        {pageType?.toLowerCase() === 'laptop' ? (
                            <>
                                <div className="h-10 w-20 mr-5 relative left-0">
                                    <button onClick={handleCpuClick}
                                            className="h-full w-full rounded-md overflow-hidden bg-gray-200 hover:bg-gray-400  flex justify-center items-center">
                                        <FontAwesomeIcon className="w-2/6" icon={faMicrochip}/>
                                        <p className="h-full w-4/6 flex items-center">
                                            CPU
                                        </p>
                                    </button>
                                    {/* Ô input cho cpu */}
                                    {showCpuOption && (
                                        <div className="flex justify-center items-center bg-black rounded-xl absolute h-16">
                                            {cpuFilter.map((p, index) => (
                                                <div key={index} className="mr-8 bg-gray-300 h-8 w-20 rounded-sm">
                                                    <button
                                                        className="w-full h-full"
                                                        onClick={() => {
                                                            handleCpuTypeClick({value: p})
                                                        }}>
                                                        {p}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="h-10 w-20 mr-5 relative">
                                    <button onClick={handleRamClick}
                                            className="h-full w-full rounded-md overflow-hidden bg-gray-200 hover:bg-gray-400 flex justify-center items-center">
                                        <FontAwesomeIcon className="w-2/6" icon={faMemory}/>
                                        <p className="h-full w-4/6 flex items-center">
                                            RAM
                                        </p>
                                    </button>
                                    {/* Ô input cho ram */}
                                    {showRamOption && (
                                        <div className="mt-4 w-1/2 flex justify-start left-64">
                                            {ramFilter.map((p, index) => (
                                                <div key={index} className="mr-8 bg-gray-300 h-8 w-20 rounded-sm">
                                                    <button
                                                        className="w-full h-full"
                                                        onClick={() => {
                                                            handleRamTypeClick({value: p})
                                                        }}>
                                                        {p}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    {/* Ô input cho giá min và max */}
                    {showPriceInput && (
                        <div className="absolute mt-1 left-10 w-1/2">
                            <div
                                className="flex items-center justify-center rounded-lg overflow-hidden h-12 w-full">
                                <PriceRangeSlider
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    setMinPrice={setMinPrice}
                                    setMaxPrice={setMaxPrice}
                                />
                                <button onClick={handleApplyPriceFilter} className="ml-6 text-white bg-red-500 w-20 h-8 rounded-sm">Apply</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className="flex flex-wrap h-auto mt-28">
                <ProductList productData={products} type={pageType}/>
            </div>

            <div className="mb-96 flex justify-center mt-9">
                <div className="flex">
                    {Array.from({length: totalPage}, (_, i) => {
                        if (i === currentPage - 1) {
                            return (
                                <button key={i}
                                        onClick={
                                            (e) => handlePageButtonClick(i + 1)
                                        }
                                        className="m-5 w-8 h-8 rounded-3xl font-bold text-white bg-gradient-to-br from-indigo-500 to-pink-500"
                                >
                                    {i + 1}
                                </button>
                            )
                        } else {
                            return (
                                <button key={i}
                                        onClick={
                                            (e) => handlePageButtonClick(i + 1)
                                        }
                                        className="m-5 w-8 h-8 rounded-lg font-bold"
                                >
                                    {i + 1}
                                </button>
                            )
                        }
                    })}
                </div>
            </div>

        </div>
    );
}

const PriceRangeSlider = ({minPrice, maxPrice, setMinPrice, setMaxPrice}) => {
    // Xác định giá trị ban đầu cho thanh trượt dựa trên minPrice và maxPrice
    const [values, setValues] = useState([minPrice, maxPrice]);

    // Cập nhật giá trị ban đầu khi minPrice và maxPrice thay đổi
    useEffect(() => {
        setValues([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    // Xử lý sự thay đổi của thanh trượt
    const handleChange = (newValues) => {
        setValues(newValues);
        setMinPrice(newValues[0]);
        setMaxPrice(newValues[1]);
    };

    return (
        <div className="flex justify-center flex-wrap w-4/5">
            <Range
                step={500000}
                min={0}
                max={200000000}
                values={values}
                onChange={handleChange}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        className="h-6 w-6 bg-white border-2 border-gray-300 rounded-full z-10"
                    />
                )}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-3 w-full rounded-md relative"
                        style={{
                            background: getTrackBackground({
                                values,
                                colors: ['#ccc', '#548BF4', '#ccc'],
                                min: 0,
                                max: 200000000,
                            }),
                        }}
                    >
                        {children}
                        <div
                            style={{
                                position: 'absolute',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '0 10px',
                                boxSizing: 'border-box',
                                marginTop: '10px'
                            }}
                        >
                            <span><FormatPrice price={values[0]} />đ</span>
                            <span><FormatPrice price={values[1]} />đ</span>
                        </div>
                    </div>
                )}
            >
                {({ handles, tracks }) => (
                    <div>
                        {handles.map(handle => (
                            <div
                                {...handle.props}
                                key={1}
                                className="h-8 w-8 bg-white border-2 border-gray-300 rounded-full z-10"
                            >
                                <div className="h-4 w-4 m-2 bg-blue-500 rounded-full"/>
                            </div>
                        ))}
                        {tracks.map(({ id, source, target }) => (
                            <div
                                key={id}
                                className="h-4"
                                style={{
                                    width: `${target.percent - source.percent}%`,
                                    backgroundColor: '#548BF4',
                                    borderRadius: '4px',
                                    alignSelf: 'center',
                                }}
                            />
                        ))}
                    </div>
                )}
            </Range>
        </div>
    );
}

export default ProductsPageByType;