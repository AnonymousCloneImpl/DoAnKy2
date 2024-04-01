import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faDisplay, faMemory, faMicrochip, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getTrackBackground, Range} from "react-range";
import FormatPrice from "@/components/FormatPrice";

export default function FilterButton({filterValue, filter, setFilter, pageType}) {
    const router = useRouter();
    const query = router.query;

    const [showPriceInput, setShowPriceInput] = useState(false);
    const [showCpuOption, setShowCpuOption] = useState(false);
    const [showRamOption, setShowRamOption] = useState(false);
    const [showDisplayOption, setShowDisplayOption] = useState(false);
    const [showConnectionOption, setShowConnectionOption] = useState(false);
    const [priceSelect, setPriceSelect] = useState(false);
    const [cpuSelect, setCpuSelect] = useState(false);
    const [ramSelect, setRamSelect] = useState(false);
    const [connectionSelect, setConnectionSelect] = useState(false);
    const [displaySelect, setDisplaySelect] = useState(false);
    // Param
    const [minPrice, setMinPrice] = useState(query.minPrice || 0);
    const [maxPrice, setMaxPrice] = useState(query.maxPrice || 200000000);

    useEffect(() => {
        setShowPriceInput(false);
        setShowRamOption(false);
        setShowCpuOption(false);
        setCpuSelect(filter.cpu);
        setConnectionSelect(filter.connection);
        setRamSelect(filter.ram);
        setDisplaySelect(filter.display);
    }, [filter.connection, filter.cpu, filter.display, filter.ram]);

    const handleCpuClick = async () => {
        if (showRamOption) {
            setShowRamOption(!showRamOption);
        }
        if (showPriceInput) {
            setShowPriceInput(!showPriceInput);
        }
        setShowCpuOption(!showCpuOption);
    };

    const handleConnectionClick = async () => {
        setShowConnectionOption(!showConnectionOption);
    };

    const handleRamClick = async () => {
        if (showCpuOption) {
            setShowCpuOption(!showCpuOption);
        }
        if (showDisplayOption) {
            setShowDisplayOption(!showDisplayOption);
        }
        if (showPriceInput) {
            setShowPriceInput(!showPriceInput);
        }
        setShowRamOption(!showRamOption);
    };

    const handleDisplayClick = async () => {
        if (showCpuOption) {
            setShowCpuOption(!showCpuOption);
        }
        if (showPriceInput) {
            setShowPriceInput(!showPriceInput);
        }
        if (showRamOption) {
            setShowRamOption(!showRamOption);
        }
        setShowDisplayOption(!showDisplayOption);
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

    const handleCpuTypeClick = async ({value}) => {
        value = value.replace(" ", "-");
        setShowCpuOption(false);
        if (query.cpu === value) {
            const { cpu, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
            setCpuSelect(false);
            setFilter(prevState => ({
                ...prevState,
                cpu : ''
            }))
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
            setCpuSelect(true);
            setFilter(prevState => ({
                ...prevState,
                cpu : value
            }))
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
            setRamSelect(false);
            setFilter(prevState => ({
                ...prevState,
                ram : ''
            }))
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
            setRamSelect(true);
            setFilter(prevState => ({
                ...prevState,
                ram : value
            }))
        }
    };

    const handleDisplayTypeClick = async ({value}) => {
        setShowDisplayOption(false);
        if (query.display === value.replace(" ", "-")) {
            const { display, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
            setDisplaySelect(false);
            setFilter(prevState => ({
                ...prevState,
                display : ''
            }))
        } else {
            if (query.display) {
                const { display, ...newQuery } = query;
                await new Promise((resolve) => {
                    router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                    resolve();
                });
            }
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, display: value.replace(" ", "-") } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
            setDisplaySelect(true);
            setFilter(prevState => ({
                ...prevState,
                display : value
            }))
        }
    };

    const handleConnectionTypeClick = async ({value}) => {
        setShowConnectionOption(false);
        if (query.connect === value.toLowerCase()) {
            const { connect, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
            setConnectionSelect(false);
            setFilter(prevState => ({
                ...prevState,
                connect : ''
            }))
        } else {
            if (query.connect) {
                const { connect, ...newQuery } = query;
                await new Promise((resolve) => {
                    router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                    resolve();
                });
            }
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, connect: value.toLowerCase() } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
            setConnectionSelect(true);
            setFilter(prevState => ({
                ...prevState,
                connect : value
            }))
        }
    };

    const handleApplyPriceFilter = async () => {
        if (query.minPrice || query.maxPrice) {
            const { minPrice, maxPrice, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                resolve();
            });
            setFilter(prevState => ({
                ...prevState,
                minPrice : '',
                maxPrice : ''
            }))
        }
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
            setFilter(prevState => ({
                ...prevState,
                minPrice: minPrice || 0,
                maxPrice: maxPrice || undefined
            }))
        });
        setShowPriceInput(!showPriceInput);
        setPriceSelect(true);
    };

    return (
        <div className="flex items-center mt-3">
            <div className="h-10 w-24 mr-5">
                {/* Ô input cho giá min và max */}
                {showPriceInput ? (
                    <>
                        <button onClick={handlePriceClick}
                                className="h-full w-full border border-red-600 text-red-600 rounded-md overflow-hidden flex justify-center items-center">
                            <FontAwesomeIcon className="w-2/6 ml-2" icon={faMoneyBill}/>
                            <p className="h-full ml-1 w-4/6 flex items-center">
                                Price
                            </p>
                            <FontAwesomeIcon className="mr-3" icon={faChevronDown}/>
                        </button>

                        <div className="rounded-2xl bg-white mt-3"
                             style={{
                                 width: '500px',
                                 boxShadow: ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                             }}
                        >
                            <div
                                className="flex items-center justify-around overflow-hidden h-20 w-full">
                                <div className="w-5/6 ml-6">
                                    <PriceRangeSlider
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        setMinPrice={setMinPrice}
                                        setMaxPrice={setMaxPrice}
                                    />
                                </div>
                                <button onClick={handleApplyPriceFilter}
                                        className="ml-6 mr-6 text-white bg-red-500 w-1/6 h-8 rounded-sm">Apply
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <button onClick={handlePriceClick}
                            className="h-full w-full rounded-md overflow-hidden bg-gray-200 hover:bg-gray-400 flex justify-center items-center">
                        <FontAwesomeIcon className="w-2/6 ml-2" icon={faMoneyBill}/>
                        <p className="h-full ml-1 w-4/6 flex items-center">
                            Price
                        </p>
                        <FontAwesomeIcon className="mr-3" icon={faChevronDown}/>
                    </button>
                )}
            </div>
            {pageType?.toLowerCase() === 'laptop' ? (
                <>
                    <div className="h-10 w-24 mr-5 relative left-0">
                        {/* Ô input cho cpu */}
                        {showCpuOption ? (
                            <>
                                <button onClick={handleCpuClick}
                                        className="h-full w-full text-red-600 border border-red-600 rounded-md overflow-hidden flex justify-center items-center">
                                    <FontAwesomeIcon className="w-2/6 ml-2" icon={faMicrochip}/>
                                    <p className="h-full w-4/6 ml-1 flex items-center">
                                        CPU
                                    </p>
                                    <FontAwesomeIcon className="mr-3" icon={faChevronDown}/>
                                </button>
                                <div
                                    className="flex mt-3 justify-center items-center bg-white rounded-md absolute left-0 h-16 cpuOption"
                                    style={{
                                        boxShadow: ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                                    }}
                                >
                                    {filterValue.cpuFilter.map((p, index) => {
                                        if (p.toLowerCase() === filter.cpu.replaceAll("-", " ").toLowerCase()) {
                                            return (
                                                <div key={index}
                                                     className="h-8 w-20 mr-2 ml-2 bg-red-100 border-2 border-red-600 rounded-sm">
                                                    <button
                                                        className="w-full h-full text-red-600"
                                                        onClick={() => {
                                                            handleCpuTypeClick({value: p})
                                                        }}>
                                                        {p}
                                                    </button>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={index}
                                                 className="bg-gray-300 h-8 w-20 rounded-sm mr-2 ml-2">
                                                <button
                                                    className="w-full h-full"
                                                    onClick={() => {
                                                        handleCpuTypeClick({value: p})
                                                    }}>
                                                    {p}
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <button onClick={handleCpuClick}

                                    className={`h-full w-full rounded-md overflow-hidden ${
                                        cpuSelect ? 'text-red-600 border-2 border-red-600 bg-red-100' : 'bg-gray-200 hover:bg-gray-400'
                                    } flex justify-center items-center`}
                            >
                                <FontAwesomeIcon className="w-2/6 ml-2" icon={faMicrochip}/>
                                <p className="h-full w-4/6 ml-1 flex items-center">
                                    CPU
                                </p>
                                <FontAwesomeIcon className="mr-3" icon={faChevronDown}/>
                            </button>
                        )}
                    </div>

                    <div className="h-10 w-24 relative mr-5">
                        {/* Ô input cho RAM */}
                        {showRamOption ? (
                            <>
                                <button onClick={handleRamClick}
                                        className={`h-full buttonColor w-full rounded-md text-red-600 border border-red-600 overflow-hidden flex justify-center items-center`}
                                >
                                    <FontAwesomeIcon className="w-2/6 ml-2" icon={faMemory}/>
                                    <p className="h-full w-4/6 ml-1 flex items-center">
                                        RAM
                                    </p>
                                    <FontAwesomeIcon className="mr-3" icon={faChevronDown}/>
                                </button>
                                <div
                                    className="flex mt-3 justify-center items-center bg-white rounded-lg absolute h-16 left-0 ramOption"
                                    style={{
                                        boxShadow: ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                                    }}
                                >
                                    {filterValue.ramFilter.map((p, index) => {
                                        if (p === filter.ram) {
                                            return (
                                                <div key={index}
                                                     className="bg-red-100 border-2 border-red-600 h-8 w-20 mr-2 ml-2 rounded-lg">
                                                    <button
                                                        className="w-full h-full text-red-600"
                                                        onClick={() => {
                                                            handleRamTypeClick({value: p})
                                                        }}>
                                                        {p}
                                                    </button>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={index}
                                                 className="bg-gray-300 h-8 w-20 mr-2 ml-2 rounded-lg">
                                                <button
                                                    className="w-full h-full"
                                                    onClick={() => {
                                                        handleRamTypeClick({value: p})
                                                    }}>
                                                    {p}
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <button onClick={handleRamClick}
                                    className={`h-full buttonNonColor w-full rounded-md overflow-hidden ${
                                        ramSelect ? 'text-red-600 border-2 border-red-600 bg-red-100' : 'bg-gray-200 hover:bg-gray-400'
                                    } flex justify-center items-center`}
                            >
                                <FontAwesomeIcon className="w-2/6 ml-2" icon={faMemory}/>
                                <p className="h-full w-4/6 ml-1 flex items-center">
                                    RAM
                                </p>
                                <FontAwesomeIcon className="mr-3" icon={faChevronDown}/>
                            </button>
                        )}
                    </div>

                    <div className="h-10 w-24 relative">
                        {/* Ô input cho Display */}
                        {showDisplayOption ? (
                            <>
                                <button onClick={handleDisplayClick}
                                        className={`h-full rounded-md text-red-600 border border-red-600 overflow-hidden flex justify-center items-center`}
                                >
                                    <FontAwesomeIcon className="ml-2" icon={faDisplay}/>
                                    <p className="h-full w-4/6 ml-1 flex items-center">
                                        Display
                                    </p>
                                    <FontAwesomeIcon className="mr-3 ml-1" icon={faChevronDown}/>
                                </button>
                                <div
                                    className="flex mt-3 justify-center items-center bg-white rounded-lg absolute h-16 left-0 ramOption"
                                    style={{
                                        boxShadow: ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                                    }}
                                >
                                    {filterValue.displayFilter?.map((p, index) => {
                                        if (p === filter.display) {
                                            return (
                                                <div key={index}
                                                     className="bg-red-100 border-2 border-red-600 w-24 h-8 mr-2 ml-2 rounded-lg">
                                                    <button
                                                        className="w-full h-full text-red-600"
                                                        onClick={() => {
                                                            handleDisplayTypeClick({value: p})
                                                        }}>
                                                        {p}
                                                    </button>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={index}
                                                 className="bg-gray-300 h-8 w-20 mr-2 ml-2 rounded-lg">
                                                <button
                                                    className="w-full h-full"
                                                    onClick={() => {
                                                        handleDisplayTypeClick({value: p})
                                                    }}>
                                                    {p}
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        ) : (
                            <button onClick={handleDisplayClick}
                                    className={`h-full rounded-md overflow-hidden ${
                                        displaySelect ? 'text-red-600 border-2 border-red-600 bg-red-100' : 'bg-gray-200 hover:bg-gray-400'
                                    } flex justify-center items-center`}
                            >
                                <FontAwesomeIcon className="ml-2" icon={faDisplay}/>
                                <p className="h-full ml-1 flex items-center">
                                    Display
                                </p>
                                <FontAwesomeIcon className="mr-3 ml-1" icon={faChevronDown}/>
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {pageType?.toLowerCase() === 'mouse' ? (
                        <>
                            <div className="h-10 w-24">
                                {/* Ô input cho Connection */}
                                {showConnectionOption ? (
                                    <>
                                        <button onClick={handleConnectionClick}
                                                className={`h-full rounded-md text-red-600 border border-red-600 overflow-hidden flex justify-center items-center`}
                                        >
                                            <FontAwesomeIcon className="ml-2" icon={faDisplay}/>
                                            <p className="h-full w-4/6 ml-1 flex items-center">
                                                Connection
                                            </p>
                                            <FontAwesomeIcon className="mr-3 ml-1" icon={faChevronDown}/>
                                        </button>
                                        <div
                                            className="flex mt-3 justify-center items-center bg-white rounded-lg absolute h-16 ramOption"
                                            style={{
                                                boxShadow: ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
                                            }}
                                        >
                                            {filterValue.connection?.map((p, index) => {
                                                if (p === filter.display) {
                                                    return (
                                                        <div key={index}
                                                             className="bg-red-100 border-2 border-red-600 w-24 h-8 mr-2 ml-2 rounded-lg">
                                                            <button
                                                                className="w-full h-full text-red-600"
                                                                onClick={() => {
                                                                    handleConnectionTypeClick({value: p})
                                                                }}>
                                                                {p}
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div key={index}
                                                         className="bg-gray-300 h-8 w-20 mr-2 ml-2 rounded-lg">
                                                        <button
                                                            className="w-full h-full"
                                                            onClick={() => {
                                                                handleConnectionTypeClick({value: p})
                                                            }}>
                                                            {p}
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <button onClick={handleConnectionClick}
                                            className={`h-full rounded-md overflow-hidden ${
                                                displaySelect ? 'text-red-600 border-2 border-red-600 bg-red-100' : 'bg-gray-200 hover:bg-gray-400'
                                            } flex justify-center items-center`}
                                    >
                                        <FontAwesomeIcon className="ml-2" icon={faDisplay}/>
                                        <p className="h-full ml-1 flex items-center">
                                            Connection
                                        </p>
                                        <FontAwesomeIcon className="mr-3 ml-1" icon={faChevronDown}/>
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    )
}

const PriceRangeSlider = ({minPrice, maxPrice, setMinPrice, setMaxPrice}) => {
    const [values, setValues] = useState([minPrice, maxPrice]);

    useEffect(() => {
        setValues([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

    const handleChange = (newValues) => {
        setValues(newValues);
        setMinPrice(newValues[0]);
        setMaxPrice(newValues[1]);
    };

    return (
        <div className="flex justify-center flex-wrap w-full">
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
                            <span><FormatPrice price={values[0]} type={'discount'}/></span>
                            <span><FormatPrice price={values[1]} type={'discount'}/></span>
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