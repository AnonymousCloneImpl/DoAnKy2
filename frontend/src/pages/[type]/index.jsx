import {useRouter} from "next/router";
import fetcher from "@/utils/fetchAPI";
import useSWR, {mutate} from "swr";
import CustomErrorPage from "@/pages/error";
import ProductsPageByType from "@/components/products/ProductsPageByType";
import {useEffect} from "react";

const postMethodFetcher = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
};

const ProductsPageRoute = () => {
    const router = useRouter();

    const page = router.query.page || 1;

    let type = router.query.type?.replace("-", " ") || null;

    let producer = router.query.producer || null;

    let minPrice = router.query.minPrice || null;

    let maxPrice = router.query.maxPrice || null;

    let cpu = router.query.cpu || null;

    let ram = router.query.ram || null;

    let limit = router.query.limit || null;

    let firstProductDataUrl = `${process.env.DOMAIN}/search/searchByCondition?page=${page}&limit=5`;

    let body = {
        "searchRequestDtoList" : [
            {
                "column" : "type",
                "value" : type,
                "operator" : "EQUAL"
            }
        ],
        "globalOperator" : "AND"
    }

    if (producer !== null) {
        body.searchRequestDtoList.push({
            "column": "producer",
            "value": producer,
            "operator": "EQUAL"
        });
    }

    if (ram !== null) {
        body.searchRequestDtoList.push({
            "column": "ram",
            "value": ram,
            "operator": "LIKE"
        });
    }

    if (maxPrice !== null && minPrice !== null) {
        body.searchRequestDtoList.push({
            "column": "price",
            "value": `${minPrice},${maxPrice}`,
            "operator": "BETWEEN"
        });
    } else if (minPrice !== null && maxPrice === null) {
        body.searchRequestDtoList.push({
            "column": "price",
            "value": `${minPrice}`,
            "operator": "GREATER_THAN"
        });
    } else if (minPrice === null && maxPrice !== null) {
        body.searchRequestDtoList.push({
            "column": "price",
            "value": `${maxPrice}`,
            "operator": "LESS_THAN"
        });
    }

    if (cpu !== null) {
        body.searchRequestDtoList.push({
            "column": "cpuType",
            "value": cpu.replace("-", " "),
            "operator": "EQUAL"
        });
    }

    const { data, isLoading, error, revalidate } = useSWR(
        firstProductDataUrl,
        () => postMethodFetcher(firstProductDataUrl, body),{
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: true
        }
    );

    useEffect(() => {
        mutate(firstProductDataUrl);
    }, [page, type, producer, minPrice, maxPrice, cpu, limit, ram]);

    const staticData = `${process.env.DOMAIN}/products/staticData?type=${type}`;

    const {data : res, error : err} = useSWR(staticData, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: true
    });

    if (isLoading || res === undefined) return <div>Loading...</div>

    if (error || err) return <CustomErrorPage />

    if (data) return <ProductsPageByType pageData={data} page={page} pageType={router.query.type} staticData={res} />

};

export default ProductsPageRoute;
