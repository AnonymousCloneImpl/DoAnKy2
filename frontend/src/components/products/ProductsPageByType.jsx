
import ProductCardComponent from "@/components/home/Component.ProductCard";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ProductList from "@/components/home/ProductList";
import { faSort
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Filter from "@/components/products/Filter";
import Sort from "@/components/products/sort";

const ProductsPageByType = ({ pageData, page, pageType, staticData }) => {
    const router = useRouter();
    const {query} =  useRouter();
    const [filter, setFilter] = useState({
        minPrice : query.minPrice || '',
        maxPrice : query.maxPrice || '',
        producer : query.producer || '',
        cpu : query.cpu || '',
        ram : query.ram || '',
        connection : query.ram || '',
        display : query.display || ''
    });
    const [filterValue, setFilterValue] = useState({});
    // Data for render
    const [products, setProducts] = useState([]);
    const [producers, setProducers] = useState([]);
    const [topSeller, setTopSeller] = useState([]);
    const [cpuFilter, setCpuFilter] = useState([]);
    const [ramFilter, setRamFilter] = useState([]);
    const [displayFilter, setDisplayFilter] = useState([]);

    // Paging
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [elementPerPage, setElementPerPage] = useState();
    const [totalElement, setTotalElement] = useState();

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
                setFilterValue({
                    cpuFilter : staticData.filter.cpuList,
                    ramFilter : staticData.filter.ramList,
                    displayFilter : staticData.filter.displayList
                })
            }
            if (pageType?.toLowerCase() === 'mouse') {
                setFilterValue({
                    connection : staticData.filter.connection
                })
            }
        }
        setCurrentPage(page);
    }, [page, pageData, pageType, staticData]);

    const handleProducerClick = async ({name}) => {
        if (query.producer === name) {
            const { producer, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
            setFilter(prevState => ({
                ...prevState,
                producer : ''
            }))
        } else {
            setFilter(prevState => ({
                ...prevState,
                producer : name
            }))
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, producer: name } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
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
                    <ul className="grid grid-cols-10 max-md:grid-cols-6 max-sm:grid-cols-4">
                        {producers.map((producer) => (
                            <li key={producer.id} className="h-8 w-46 mb-3">
                                {filter.producer.toLowerCase() === producer.name.toLowerCase() ? (
                                    <div className="h-full flex items-center">
                                        <button className="h-full bg-white relative w-1/2 border-2 border-red-600 rounded-md overflow-hidden flex justify-center items-center"
                                                onClick={() => handleProducerClick({ name: producer.name.toLowerCase() })}
                                        >
                                            <img
                                                src={`${producer.image}`}
                                                className="h-4/6 w-11/12"
                                            />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="h-full">
                                        <button
                                            className="h-full bg-white w-1/2 rounded-md overflow-hidden flex justify-center items-center"
                                            onClick={() => handleProducerClick({name: producer.name.toLowerCase()})}
                                        >
                                            <img
                                                src={`${producer.image}`}
                                                className="h-4/6 w-11/12"
                                            />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* FILTER */}
            <div className="">
                <div className="relative z-10">
                    <Filter filter={filter}
                            cpuFilter={cpuFilter}
                            ramFilter={ramFilter}
                            displayFilter={displayFilter}
                            pageType={pageType}
                            setFilter={setFilter}
                            filterValue={filterValue}
                    />
                </div>
                <div className="relative z-0 mt-3">
                    <div className="text-xl mb-2">
                        <FontAwesomeIcon icon={faSort}/>
                        SORT
                    </div>
                    <Sort />
                </div>
            </div>

            <div className="flex flex-wrap h-auto mt-10">
                {products.length !== 0 ? (
                    <ProductList productData={products} type={pageType}/>
                ) : (
                    <div className="w-full">
                        <p className="text-5xl w-full text-center">No products found</p>
                    </div>
                )}
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

export default ProductsPageByType;