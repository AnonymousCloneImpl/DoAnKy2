import fetcher from "@/utils/fetchAPI";
import ProductCardComponent from "@/components/home/Component.ProductCard";
import ComponentProducerList from "@/components/Component.ProducerList";
import Link from "next/link";
import FormatPrice from "@/components/FormatPrice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
import ButtonPaging from "@/components/Pagination";
import {getTrackBackground, Range} from "react-range";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import useSWR from "swr";

const ProductsPageByType = ({ pageData }) => {
    const router = useRouter();
    const {query} =  useRouter();
    const [showPriceInput, setShowPriceInput] = useState(false);

    // Data for render
    const [products, setProducts] = useState([]);
    const [topSeller, setTopSeller] = useState([]);

    // Paging
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [elementPerPage, setElementPerPage] = useState();
    const [totalElement, setTotalElement] = useState();

    // Param
    const [minPrice, setMinPrice] = useState(query.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(query.maxPrice || '');

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
    }, []);

    const handleStockClick = async () => {
        if (query.stock) {
            const { stock, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
        } else {
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, stock: true } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
    };

    const handlePriceClick = () => {
        setShowPriceInput(!showPriceInput);
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

    const useParamPage = async (value) => {
        const newQuery = value === 1 ? { ...query } : { ...query, page: value };

        if (value === 1 && newQuery.page) {
            delete newQuery.page;
        }

        setCurrentPage(value);

        await useNewData(value);

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

    const useNewData = async (page) => {
        let url = `${process.env.DOMAIN}/products/${query.type}?page=${page}&limit=${elementPerPage}`;

        const data = await fetcher(url);

        if (data) {
            setProducts(data.productSummaryDtoList);
        }

    }

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
                <div className="w-full">
                    <ProductCardComponent productData={topSeller}/>
                </div>
            </div>

            <div className="h-32">
                <div className="h-1/4">
                    <p>CHUYÊN TRANG THƯƠNG HIỆU</p>
                </div>
                <div className="w-full h-3/4">
                    <ComponentProducerList/>
                </div>
            </div>
            <div className="w-full h-36">
                <div className="h-1/4">
                    <p>
                        CHỌN THEO NHU CẦU
                    </p>
                </div>
                <div className="h-3/4 flex justify-around">
                    <div className="w-1/12 h-full rounded-md overflow-hidden"
                         style={{backgroundColor: 'rgb(253,180,113)'}}
                    >
                        <Link href="/">
                            <div className="h-1/6">
                                <p className="w-full h-full text-center text-lg text-white">
                                    Văn Phòng
                                </p>
                            </div>
                            <div className="h-5/6 w-full flex justify-center">
                                <div style={{
                                    background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-971.svg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'bottom'
                                }}
                                     className="h-full w-full"
                                >
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-1/12 h-full rounded-md overflow-hidden"
                         style={{backgroundColor: 'rgb(247, 119, 77)'}}
                    >
                        <Link href="/">
                            <div className="h-1/6">
                                <p className="w-full h-full text-center text-lg text-white">
                                    Gaming
                                </p>
                            </div>
                            <div className="h-5/6 w-full flex justify-center">
                                <div style={{
                                    background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-973.svg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'bottom'
                                }}
                                     className="h-full w-full"
                                >
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-1/12 h-full rounded-md overflow-hidden"
                         style={{backgroundColor: 'rgb(255, 143, 143)'}}
                    >
                        <Link href="/">
                            <div className="h-1/6">
                                <p className="w-full h-full text-center text-lg text-white">
                                    Đồ họa
                                </p>
                            </div>
                            <div className="h-5/6 w-full flex justify-center">
                                <div style={{
                                    background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-971.svg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'bottom'
                                }}
                                     className="h-full w-full"
                                >
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-1/12 h-full rounded-md overflow-hidden"
                         style={{backgroundColor: 'rgb(237, 85, 108)'}}
                    >
                        <Link href="/">
                            <div className="h-1/6">
                                <p className="w-full h-full text-center text-lg text-white">
                                    Mỏng nhẹ
                                </p>
                            </div>
                            <div className="h-5/6 w-full flex justify-center">
                                <div style={{
                                    background: "url('https://cellphones.com.vn/media/icons/category/laptop/filter-cate-1071.svg')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'bottom'
                                }}
                                     className="h-full w-full"
                                >
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-1/12 h-full rounded-md overflow-hidden">
                    </div>
                    <div className="w-1/12 h-full">
                    </div>
                </div>
            </div>

            <div>
                <div>
                    Filter
                </div>
                <div>
                    <div className="flex justify-start items-center">
                        <div className="h-10 w-1/12 border border-black rounded-xl overflow-hidden mr-5">
                            <a onClick={handleStockClick} className="h-full w-full" role="button">
                                <p className="h-full w-full flex justify-center items-center">
                                    Stocking
                                </p>
                            </a>
                        </div>
                        <div className="h-10 w-1/12 border border-black rounded-xl overflow-hidden mr-5">
                            <div className="rounded-xl overflow-hidden h-full w-full">
                                <a onClick={handlePriceClick} className="h-full w-full" role="button">
                                    <p className="h-full w-full flex justify-center items-center">
                                        Price
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                {/* Ô input cho giá min và max */}
                {showPriceInput && (
                    <div className="absolute mt-1 left-52 w-1/2">
                        <div
                            className="flex items-center justify-center border border-black rounded-lg overflow-hidden h-12 w-full">
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
            </div>

            <div className="h-20 flex items-center mt-8 mb-3">
                <p className="flex items-center text-3xl">
                    {products[0]?.type}
                </p>
            </div>

            <div className="flex flex-wrap h-auto">
                {products.map((product) => (
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

            <div className="mb-96 flex justify-center">
                <ButtonPaging
                    totalPages={totalPage}
                    setParamPage={useParamPage}
                    currentPage={currentPage}
                />
            </div>

        </div>
    );
}

const PriceRangeSlider = ({minPrice, maxPrice, setMinPrice, setMaxPrice}) => {
    const [values, setValues] = useState([0, 10000000]);

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
                                marginTop: '10px',
                            }}
                        >
                            <span>{values[0]}</span>
                            <span>{values[1]}</span>
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