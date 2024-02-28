import Link from "next/link";
import ProductCardComponent from "@/components/home/Component.ProductCard";
import {useRouter} from "next/router";
import {useState} from "react";
import {getTrackBackground, Range} from "react-range";

const ProductsPage = ({pageData}) => {

    const router = useRouter();
    const {query} = router;

    const [minPrice, setMinPrice] = useState(query.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(query.maxPrice || '');
    const [showPriceInput, setShowPriceInput] = useState(false);

    const handleStockClick = () => {
        router.push({pathname: router.pathname, query: {...query, stock: true}});
    };

    const handleProducerClick = () => {
        // Hiển thị list các producer
        console.log('Show producer list');
    };

    const handlePriceClick = () => {
        setShowPriceInput(!showPriceInput);
    };

    const handleApplyPriceFilter = () => {
        // Áp dụng bộ lọc giá khi người dùng bấm vào nút áp dụng
        router.push({
            pathname: router.pathname,
            query: {
                ...query,
                minPrice: minPrice || 0,
                maxPrice: maxPrice || undefined,
            },
        });
    };

    if (!pageData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-full">
            <div>
                <p>This should be small slider</p>
            </div>
            <div className="h-32">
                <div className="h-1/4">
                    <p>CHUYÊN TRANG THƯƠNG HIỆU</p>
                </div>
                <div className="w-full h-3/4">
                    <ul className="flex flex-wrap justify-start h-full">
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                        <li className="w-1/6 h-1/3 flex justify-center">
                            <div className="h-full w-1/2">
                                <Link href=""
                                      className="h-full w-full border border-black rounded-md overflow-hidden flex justify-center items-center">
                                    <img
                                        src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png"
                                        className="h-4/6 w-11/12"
                                    />
                                </Link>
                            </div>
                        </li>
                    </ul>
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

            <div className="h-auto rounded-2xl overflow-hidden mt-10"
                 style={{background: 'linear-gradient(rgb(224, 0, 51), rgb(224, 0, 51)) 0% 0% / cover'}}
            >
                <div className="h-32">
                    <p className="h-full w-full flex justify-center items-center text-6xl text-white">
                        TOP SELLER
                    </p>
                </div>
                <div className="h-96 w-full mb-3">
                    <ProductCardComponent productData={pageData}/>
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
                            <a onClick={handleProducerClick} className="h-full w-full" role="button">
                                <p className="h-full w-full flex justify-center items-center">
                                    Producer
                                </p>
                            </a>
                        </div>
                        <div className="h-10 w-1/12 border border-black rounded-xl overflow-hidden mr-5">
                            <div className="border border-black rounded-xl overflow-hidden h-full w-full">
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

            <div className="absolute mt-1 left-1/4 w-1/3">
                {/* Ô input cho giá min và max */}
                {showPriceInput && (
                    <div className="flex items-center justify-center border border-black rounded-lg overflow-hidden h-12">
                        <PriceRangeSlider
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                        />
                        <button onClick={handleApplyPriceFilter} className="ml-6">Apply</button>
                    </div>
                )}
            </div>

            <div className="mt-20">

            </div>
        </div>
    );
};

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


export default ProductsPage;
