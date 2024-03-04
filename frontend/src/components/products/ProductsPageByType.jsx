import fetcher from "@/utils/fetchAPI";
import ProductCardComponent from "@/components/home/Component.ProductCard";
import Link from "next/link";
import ButtonPaging from "@/components/Pagination";
import {getTrackBackground, Range} from "react-range";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ProductList from "@/components/home/ProductList";
import FormatPrice from "@/components/FormatPrice";

const ProductsPageByType = ({ pageData, page, pageType, topSellerBE }) => {
    const router = useRouter();
    const {query} =  useRouter();
    const [showPriceInput, setShowPriceInput] = useState(false);
    const [showCpuOption, setShowCpuOption] = useState(false);

    // Data for render
    const [products, setProducts] = useState([]);
    const [producers, setProducers] = useState([]);
    const [topSeller, setTopSeller] = useState([]);
    const [cpuFilter, setCpuFilter] = useState([]);

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

        if (topSellerBE) {
            setTopSeller(topSellerBE)
        }

        setCurrentPage(page);
    }, []);

    const handleCpuClick = async () => {
        setShowCpuOption(!showCpuOption);
    };

    const handlePriceClick = () => {
        setShowPriceInput(!showPriceInput);
    };

    const handleProducerClick = async ({name}) => {
        await new Promise((resolve) => {
            router.push({ pathname: router.pathname, query: { ...query, producer: name } }, undefined, { shallow: true, scroll: false, });
            resolve();
        });
    };

    const handleOptionClick = async ({value}) => {
        if (query.option === value) {
            const { option, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
        } else {
            if (query.option) {
                const { option, ...newQuery } = query;
                await new Promise((resolve) => {
                    router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                    resolve();
                });
            }
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, option: value } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
    };

    const handleCpuTypeClick = async ({value}) => {
        value = value.replace(" ", "-");
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

    const handleApplyPriceFilter = async () => {
        await new Promise((resolve) => {
            router.push({
                pathname: router.pathname,
                query: {
                    ...query,
                    minprice: minPrice || 0,
                    maxprice: maxPrice || undefined,
                }},
                undefined,
                { shallow: true, scroll: false, }
            );
            resolve();
        });
        setShowPriceInput(!showPriceInput);
    };

    const handlePageButtonClick = async (value) => {
        const newQuery = value === 1 ? { ...query } : { ...query, page: value };

        if (value === 1 && newQuery.page) {
            delete newQuery.page;
        }

        setCurrentPage(value);

        await new Promise((resolve) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: newQuery,
                },
                undefined,
                { shallow: true, scroll: false, }
            );
            resolve();
        })
    };

    return (
        <div className="h-full">
            <div>
                <p>This should be small slider</p>
            </div>

            <div className="h-auto rounded-2xl overflow-hidden mt-10"
                 style={{background: 'linear-gradient(rgb(224, 0, 51), rgb(224, 0, 51)) 0% 0% / cover'}}
            >
                <div className="h-32">
                    <p className="h-full w-full flex justify-center items-center text-6xl text-white">
                        TOP SELLER
                    </p>
                </div>
                <div className="w-full mb-8">
                    <ProductCardComponent productData={topSeller} type={"laptop"}/>
                </div>
            </div>

            <div className="mt-8 h-20">
                <div className="text-2xl">
                    <p className="h-10">CHUYÊN TRANG THƯƠNG HIỆU</p>
                </div>
                <div className="w-full mt-3">
                    <ul className="flex flex-wrap justify-start">
                        {producers.map((producer) => (
                            <li key={producer.id} className="h-8 w-36 flex ">
                                <div className="h-full">
                                    <button className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center"
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
            <div className="w-full mt-8">
                <div className="h-1/4">
                    <p className="text-2xl">
                        CHỌN THEO NHU CẦU
                    </p>
                </div>
                <div className="flex mt-3">
                    <div className="w-1/12 h-full rounded-md overflow-hidden mr-6"
                         style={{backgroundColor: 'rgb(253,180,113)'}}
                    >
                        <button
                            onClick={() => handleOptionClick({value : "vanphong"})}
                            className="h-28 w-full flex flex-col items-center justify-center text-white"
                        >
                            <div className="h-1/6">
                                <p className="text-lg">Văn Phòng</p>
                            </div>
                            <div
                                style={{
                                    background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-971.svg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'bottom'
                                }}
                                className="h-5/6 w-full"
                            >
                            </div>
                        </button>
                    </div>
                    <div className="w-1/12 rounded-md overflow-hidden mr-6"
                         style={{backgroundColor: 'rgb(247, 119, 77)'}}
                    >
                        <button
                            onClick={() => handleOptionClick({value : "gaming"})}
                            className="h-28 w-full flex flex-col items-center justify-center text-white"
                        >
                            <div className="h-1/6">
                                <p className="text-lg">Gaming</p>
                            </div>
                            <div style={{
                                background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-973.svg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom'
                            }}
                                 className="h-full w-full"
                            >
                            </div>
                        </button>
                    </div>
                    <div className="w-1/12 rounded-md overflow-hidden mr-6"
                         style={{backgroundColor: 'rgb(255, 143, 143)'}}
                    >
                        <button
                            onClick={() => handleOptionClick({value : "dohoa"})}
                            className="h-28 w-full flex flex-col items-center justify-center text-white"
                        >
                            <div className="h-1/6">
                                <p className="text-lg">Đồ họa</p>
                            </div>
                            <div style={{
                                background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-971.svg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom'
                            }}
                                 className="h-full w-full"
                            >
                            </div>
                        </button>
                    </div>
                    <div className="w-1/12 rounded-md overflow-hidden mr-6"
                         style={{backgroundColor: 'rgb(237, 85, 108)'}}
                    >
                        <button
                            onClick={() => handleOptionClick({value : "mongnhe"})}
                            className="h-28 w-full flex flex-col items-center justify-center text-white"
                        >
                            <div className="h-1/6">
                                <p className="text-lg">Mỏng nhẹ</p>
                            </div>
                            <div style={{
                                background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-1071.svg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom'
                            }}
                                 className="h-full w-full"
                            >
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="text-2xl">
                    FILTER
                </div>
                <div className="mt-3">
                    <div className="flex justify-start items-center">
                        <div className="h-10 w-1/12 mr-5">
                            <button onClick={handlePriceClick} className="h-full w-full">
                                <p className="h-full w-full flex justify-start items-center text-xl">
                                    Price
                                </p>
                            </button>
                        </div>
                        <div className="h-10 w-1/12 mr-5">
                            <button onClick={handleCpuClick} className="h-full w-full">
                                <p className="h-full w-full flex justify-start items-center text-xl">
                                    CPU
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Ô input cho giá min và max */}
                    {showPriceInput && (
                        <div className="absolute mt-1 left-8 w-1/2">
                            <div
                                className="flex items-center justify-center rounded-lg overflow-hidden h-12 w-full">
                                <PriceRangeSlider
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    setMinPrice={setMinPrice}
                                    setMaxPrice={setMaxPrice}
                                />
                                <button onClick={handleApplyPriceFilter} className="ml-6">Apply</button>
                            </div>
                        </div>
                    )}

                    {/* Ô input cho cpu */}
                    {showCpuOption && (
                        <div className="absolute mt-4 w-1/2 flex justify-start left-48">
                            {cpuFilter.map((p) => (
                                <div key={p.id} className="mr-8">
                                    <button onClick={() => {handleCpuTypeClick({value : p})}}>
                                        {p}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap h-auto mt-28">
                <ProductList productData={products} type={pageType} />
            </div>

            <div className="mb-96 flex justify-center">
                <ButtonPaging
                    totalPages={totalPage}
                    handlePageClick={handlePageButtonClick}
                    currentPage={currentPage}
                />
            </div>

        </div>
    );
}

const PriceRangeSlider = ({minPrice, maxPrice, setMinPrice, setMaxPrice}) => {
    const [values, setValues] = useState([0, 200000000]);

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
                renderThumb={({props, isDragged}) => (
                    <div
                        {...props}
                        className="h-6 w-6 bg-white border-2 border-gray-300 rounded-full z-10"
                    />
                )}
                renderTrack={({props, children}) => (
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
                {({handles, tracks}) => (
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
                        {tracks.map(({id, source, target}) => (
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