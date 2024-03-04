import {useRouter} from "next/router";
import fetcher from "@/utils/fetchAPI";
import useSWR from "swr";
import CustomErrorPage from "@/pages/error";
import ProductsPageByType from "@/components/products/ProductsPageByType";

const ProductsPageRoute = () => {
    const router = useRouter();

    const page = router.query.page || 1;

    let producer = router.query.producer || null;

    let minPrice = router.query.minprice || null;

    let maxPrice = router.query.maxprice || null;

    let stock = router.query.stock || null;

    let option = router.query.option || null;

    let firstProductDataUrl = `${process.env.DOMAIN}/products/${router.query.type}?page=${page}`;

    if (producer !== null) {
        firstProductDataUrl += `&producer=${producer}`
    }

    if (minPrice !== null) {
        firstProductDataUrl += `&minprice=${minPrice}`
    }

    if (maxPrice !== null) {
        firstProductDataUrl += `&maxprice=${maxPrice}`
    }

    if (stock !== null) {
        firstProductDataUrl += `&stock=${stock}`
    }

    if (option !== null) {
        firstProductDataUrl += `&option=${option}`
    }

    firstProductDataUrl += `&limit=5`;

    console.log(firstProductDataUrl)

    const topSellerApi = `${process.env.DOMAIN}/products/top-seller?type=${router.query.type}`;

    const {data : topSeller, error : err} = useSWR(topSellerApi, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    const {data, isLoading, error} = useSWR(firstProductDataUrl, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    if (isLoading) return <div>Loading...</div>

    if (error) return <CustomErrorPage />

    if (data) return <ProductsPageByType pageData={data} page={page} pageType={router.query.type} topSellerBE={topSeller} />

};

export default ProductsPageRoute;
