import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faXmark } from "@fortawesome/free-solid-svg-icons";
import FilterButton from "@/components/products/FilterButton";
import { useRouter } from "next/router";

const Filter = ({ filter, setFilter, filterValue, pageType }) => {
  const router = useRouter();
  const query = router.query;
  const [isFilterEmpty, setIsFilterEmpty] = useState(false);

  useEffect(() => {
    setIsFilterEmpty(Object.values(filter).every(value => value === ''));
  }, [filter]);

  const handleRemoveFilterClick = async () => {
    setFilter({
      minPrice: '',
      maxPrice: '',
      producer: '',
      display: '',
      cpu: '',
      ram: ''
    })
    const { ram, minPrice, display, maxPrice, producer, cpu, ...newQuery } = query;
    await new Promise((resolve) => {
      router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, { shallow: true, scroll: false });
      resolve();
    });
  };

  return (
    <>
      {!isFilterEmpty ? (
        <div>
          <button
            className="flex text-red-600 border-2 border-red-600 bg-red-100 h-10 items-center rounded-lg"
            onClick={handleRemoveFilterClick}
          >
            <FontAwesomeIcon className="text-lg mr-1 ml-1" icon={faFilter} />
            <p className="text-xl">FILTER</p>
            <div
              className='bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center ml-2 mr-2'
              onClick={handleRemoveFilterClick}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </button>
        </div>
      ) : (
        <div>
          <button
            className="flex bg-white h-10 items-center rounded-lg"
            disabled={true}
          >
            <FontAwesomeIcon className="text-lg mr-1 ml-1" icon={faFilter} />
            <p className="text-xl">FILTER</p>
          </button>
        </div>
      )}
      <FilterButton
        filterValue={filterValue}
        setFilter={setFilter}
        filter={filter}
        pageType={pageType}
      />
    </>
  );

};

export default Filter;
