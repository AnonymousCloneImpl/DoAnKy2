import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownShortWide, faArrowDownWideShort, faCalendarDays, faFire} from "@fortawesome/free-solid-svg-icons";

export default function Sort({sort, setSort}) {
    const value = [
        {
            name : "Popular",
            icon : faFire
        },
        {
            name : "Price Low - High",
            icon : faArrowDownShortWide
        },
        {
            name : "Price High - Low",
            icon : faArrowDownWideShort
        },
        {
            name : "News",
            icon : faCalendarDays
        }
    ]
    return (
        <div className="flex mt-3">
            {value.map((item, index) => {
                if (sort === item.name) {
                    return (
                        <button
                            key={index}
                            className="flex items-center justify-around mr-3 text-red-600 border-2 border-red-600 rounded-md"
                            style={{
                                height: '40px'
                            }}
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