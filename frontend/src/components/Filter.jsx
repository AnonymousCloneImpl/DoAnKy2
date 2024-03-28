
import { useEffect, useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faFilterCircleXmark, faXmark} from "@fortawesome/free-solid-svg-icons";

const Filter = ({ filter, handleRemoveFilterClick }) => {
    const [isFilterEmpty, setIsFilterEmpty] = useState(false);

    useEffect(() => {
        setIsFilterEmpty(Object.values(filter).every(value => value === ''));
    }, [filter]);

    if (!isFilterEmpty) {
        return (
            <button
                className="flex text-red-600 border-2 border-red-600 bg-red-100 h-10 items-center rounded-lg"
                onClick={handleRemoveFilterClick}
            >
                <FontAwesomeIcon className="text-lg mr-1 ml-1" icon={faFilterCircleXmark} />
                <p>FILTER</p>
                <div
                    className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 mr-2'
                    onClick={handleRemoveFilterClick}
                >
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
            </button>
        );
    }
    return (
        <div className="flex h-10 items-center rounded-lg">
            <FontAwesomeIcon className="text-lg mr-1 ml-1" icon={faFilter}/>
            <p>FILTER</p>
        </div>
    );
};

export default Filter;