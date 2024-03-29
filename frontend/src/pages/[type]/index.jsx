import {useRouter} from "next/router";
import fetcher from "@/utils/fetchAPI";
import useSWR, {mutate} from "swr";
import CustomErrorPage from "@/pages/error";
import ProductsPageByType from "@/components/products/ProductsPageByType";
import {useEffect} from "react";
import axios from "axios";

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

    let sale = router.query.sale || null;

    let firstProductDataUrl = `${process.env.DOMAIN}/search/searchByCondition`;

    let body = {
        "searchRequestDtoList" : [
            {
                "column" : "type",
                "value" : type,
                "operator" : "EQUAL"
            }
        ],
        "globalOperator" : "AND",
        "page" : page,
        "limit" : 5
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

    if (sale !== null) {
        body.searchRequestDtoList.push({
            "column": "discount",
            "value": sale,
            "operator": "EQUAL"
        });
    }

    const { data, isLoading, error } = useSWR(
        firstProductDataUrl,
        () => postMethodFetcher(firstProductDataUrl, body),{
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    useEffect(() => {
        mutate(firstProductDataUrl);
    }, [page, type, producer, minPrice, maxPrice, cpu, limit, ram, firstProductDataUrl]);

    const staticData = `${process.env.DOMAIN}/products/staticData?type=${type}`;

    const {data : res, isLoading : loading, error : err} = useSWR(staticData, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    if (isLoading || loading) return <div>Loading...</div>

    if (error ||
        err ||
        data === undefined ||
        data === null ||
        res === undefined ||
        res === null) {
        return <CustomErrorPage />
    }

    if (data) return <ProductsPageByType pageData={data} page={page} pageType={type} staticData={res} />

};

export default ProductsPageRoute;
