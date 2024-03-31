import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownShortWide, faArrowDownWideShort, faCalendarDays, faFire} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const value = [
    {
        name : "Popular",
        icon : faFire
    },
    {
        name : "Price Low-High",
        icon : faArrowDownShortWide
    },
    {
        name : "Price High-Low",
        icon : faArrowDownWideShort
    },
    {
        name : "News",
        icon : faCalendarDays
    }
]

export default function Sort() {
    const router = useRouter();
    const {query} = useRouter();
    const [sortActive, setSortActive] = useState("Popular");
    const [sort, setSort] = useState({
        column : query.sort || '',
        dir : query.dir || ''
    });

    useEffect(() => {
        if (sort.column.toLowerCase() === "price" && sort.dir === "ASC") {
            setSortActive(value[1].name);
        }
        if (sort.column.toLowerCase() === "price" && sort.dir === "DESC") {
            setSortActive(value[2].name);
        }
        if (sort.column.toLowerCase() === "popular") {
            setSortActive(value[0].name);
        }
        if (sort.column.toLowerCase() === "news") {
            setSortActive(value[3].name);
        }
    }, [sort.column, sort.dir, sort.sort]);

    const handleSortClick = async (value) => {
        setSortActive(value);
        if (value === "Price Low-High" || value === "Price High-Low") {
            let arr = value.split(" ");
            if (arr[1] === "Low-High") {
                arr[1] = "ASC";
            } else {
                arr[1] = "DESC";
            }
            if (query.sort) {
                const { sort, dir, ...newQuery } = query;
                await new Promise((resolve) => {
                    router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
                    resolve();
                });
            }
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...query, sort: arr[0].toLowerCase(), dir: arr[1] } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
        if (value === "Popular") {
            const { sort, dir, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
        if (value === "News") {
            const { sort, dir, ...newQuery } = query;
            await new Promise((resolve) => {
                router.push({ pathname: router.pathname, query: { ...newQuery, sort: value.toLowerCase() } }, undefined, { shallow: true, scroll: false, });
                resolve();
            });
        }
    };

    return (
        <div className="flex">
            {value.map((item, index) => {
                if (sortActive === item.name) {
                    return (
                        <button
                            key={index}
                            className="flex z-0 items-center justify-around mr-3 text-red-600 bg-red-50 border-2 border-red-600 rounded-md"
                            style={{
                                height: '40px'
                            }}
                            disabled={true}
                        >
                            <FontAwesomeIcon className="ml-2" icon={item.icon}/>
                            <p className="ml-1 mr-2">
                                {item.name}
                            </p>
                        </button>
                    )
                }
                return (
                    <button
                        key={index}
                        className="flex justify-around bg-gray-200 items-center mr-3 rounded-md"
                        style={{
                            height: '40px'
                        }}
                        onClick={() => handleSortClick(item.name)}
                    >
                        <FontAwesomeIcon className="ml-2" icon={item.icon}/>
                        <p className="ml-1 mr-2">
                            {item.name}
                        </p>
                    </button>
                )
            })}
        </div>
    )
}