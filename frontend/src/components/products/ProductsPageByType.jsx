import ProductCardComponent from "@/components/home/Component.ProductCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductList from "@/components/home/ProductList";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "@/components/products/Filter";
import Sort from "@/components/products/sort";
import useSWR, { mutate } from "swr";
import fetcher from "@/utils/fetchAPI";
import CustomErrorPage from "@/pages/error";
import fetchAPIPost from "@/utils/fetchAPI-post";
import BodyBuilder from "@/utils/BodyBuilder";
import CartNotification from "@/components/CartNotification";
import Loading from "@/components/Loading";
import Head from "next/head";

const ProductsPageByType = ({ type }) => {
  const router = useRouter();
  const { query } = useRouter();
  const [filter, setFilter] = useState({
    minPrice: query.minPrice || '',
    maxPrice: query.maxPrice || '',
    producer: query.producer || '',
    cpu: query.cpu || '',
    ram: query.ram || '',
    connection: query.connect || '',
    display: query.display || ''
  });
  const [cartNotifications, setCartNotifications] = useState([]);
  const [filterValue, setFilterValue] = useState({});
  // Data for render
  const [products, setProducts] = useState([]);
  const [producers, setProducers] = useState([]);
  const [topSeller, setTopSeller] = useState([]);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [elementPerPage, setElementPerPage] = useState(0);
  const [totalElement, setTotalElement] = useState(0);

  const page = router.query.page || 1;

  const [body, setBody] = useState({});

  const defaultLimit = window.innerWidth >= 1280 || (window.innerWidth >= 640 && window.innerWidth <= 1024) ? 15 : 16;

  const [limit, setLimit] = useState(defaultLimit);

  useEffect(() => {
    const handleResize = () => {
      const newLimit =
        window.innerWidth >= 1280 || (window.innerWidth >= 640 && window.innerWidth <= 1023)
          ? 15
          : 16;
      setLimit(newLimit);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const body = BodyBuilder({ query, limit });
    setBody(body)
  }, [limit, query]);

  const ProductPageCategoryDataApi = `${process.env.DOMAIN}/search/searchByCondition`;

  const { data, loading, error } = useSWR([ProductPageCategoryDataApi, body],
    () => fetchAPIPost(ProductPageCategoryDataApi, body), {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  useEffect(() => {
    mutate(ProductPageCategoryDataApi);
  }, [body, ProductPageCategoryDataApi]);

  useEffect(() => {
    if (data?.productSummaryDtoList) {
      setProducts(data.productSummaryDtoList);
    }

    if (data?.totalPageNumber) {
      setTotalPage(data.totalPageNumber);
    }

    if (data?.elementPerPage) {
      setElementPerPage(data.elementPerPage);
    }

    if (data?.totalElement) {
      setTotalElement(data.totalElement);
    }

    setCurrentPage(page);
  }, [data, page]);

  const staticData = `${process.env.DOMAIN}/products/staticData?type=${type}`;

  const { data: res, isLoading: isLoading, error: err } = useSWR(staticData, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  useEffect(() => {
    mutate(staticData);
  }, [type, staticData]);

  useEffect(() => {
    setTopSeller(res?.productSummaryDtoList);
    setProducers(res?.producerList);
    if (type?.toLowerCase() === 'laptop') {
      setFilterValue({
        cpuFilter: res?.filter?.cpuList,
        ramFilter: res?.filter?.ramList,
        displayFilter: res?.filter?.displayList
      })
    }
    if (type?.toLowerCase() === 'mouse') {
      setFilterValue({
        connection: res?.filter?.connection
      })
    }
  }, [res, type]);

  if (loading || isLoading) {
    return (
      <Loading />
    )
  }

  if (err || error) {
    return <CustomErrorPage />
  }

  const handleProducerClick = async ({ name }) => {
    if (query.producer === name) {
      const { producer, ...newQuery } = query;
      await new Promise((resolve) => {
        router.push({ pathname: router.pathname, query: { ...newQuery } }, undefined, {
          shallow: true,
          scroll: false
        });
        resolve();
      });
      setFilter(prevState => ({
        ...prevState,
        producer: ''
      }))
    } else {
      setFilter(prevState => ({
        ...prevState,
        producer: name
      }))
      await new Promise((resolve) => {
        router.push({ pathname: router.pathname, query: { ...query, producer: name } }, undefined, {
          shallow: true,
          scroll: false,
        });
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
        { shallow: true, scroll: false }
      );
      resolve();
    })
  };

  return (
    <div
      style={{
        margin: "auto",
        width: '95%'
      }}
      className="h-full"
    >
      <Head>
        <title>
          {type.toUpperCase()}
        </title>
      </Head>
      <div className="">
        <img src={"/panel/products-panel.jpg"} alt={"banner"} loading={"lazy"}
          className="w-full rounded-xl mt-3 h-96 max-lg:h-60" />
      </div>

      <div className="h-auto mt-10 bg-gray-300 bg-custom rounded-xl">
        <div className="h-24">
          <p className="h-full w-full flex justify-center items-center text-5xl text-white">
            TOP SELLER
          </p>
        </div>
        <div className="mb-8">
          <ProductCardComponent
            productData={topSeller}
            type={"laptop"}
            setCartNotifications={setCartNotifications}
            needSlider={true}
          />
        </div>
        <div className="h-3">

        </div>
      </div>

      <div className="mt-8">
        <div className="text-2xl">
          <p className="h-10">BRAND PAGE</p>
        </div>
        <div className="w-full mt-3">
          <ul className="grid grid-cols-9 max-md:grid-cols-6 max-sm:grid-cols-4">
            {producers?.map((producer, index) => (
              <li key={index} className="h-10 mb-3">
                <div className="h-full flex items-center justify-center">
                  <button
                    className={`h-full bg-white p-2 rounded-md overflow-hidden flex justify-center items-center
                      ${filter.producer.toLowerCase() === producer.name.toLowerCase() ? "border-2 border-red-600" : ''}
                    `}
                    onClick={() => handleProducerClick({ name: producer.name.toLowerCase() })}
                  >
                    <img
                      src={`${producer.image}`}
                      className="h-full"
                      loading={"lazy"}
                      alt=""
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FILTER */}
      <div className="">
        <div className="relative z-10">
          <Filter filter={filter}
            pageType={type}
            setFilter={setFilter}
            filterValue={filterValue}
          />
        </div>
        <div className="relative z-0 mt-3">
          <div className="text-xl mb-2">
            <FontAwesomeIcon icon={faSort} />
            SORT
          </div>
          <Sort />
        </div>
      </div>

      <div className="flex flex-wrap h-auto mt-10">
        {products?.length !== 0 ? (
          <ProductList productData={products} type={type} setCartNotifications={setCartNotifications} />
        ) : (
          <div className="w-full">
            <p className="text-5xl w-full text-center">No products found</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-9 mb-9">
        <div className="flex">
          {Array.from({ length: totalPage }, (_, i) => (
            <button key={i}
              onClick={
                () => handlePageButtonClick(i + 1)
              }
              className={`m-5 w-8 h-8 rounded-lg font-bold text-xl ${i === currentPage - 1 ? "text-white bg-gradient-to-br from-indigo-500 to-pink-500" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <CartNotification cartNotifications={cartNotifications} />

    </div>
  );
}

export default ProductsPageByType;
