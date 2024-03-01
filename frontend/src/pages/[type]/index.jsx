import {useRouter} from "next/router";
import fetcher from "@/utils/fetchAPI";
import useSWR from "swr";
import CustomErrorPage from "@/pages/error";
import ProductsPageByType from "@/components/products/ProductsPageByType";

const ProductsPageRoute = () => {
    const {query} =  useRouter();

    const firstDataUrl = `${process.env.DOMAIN}/products/${query.type}?limit=5`;

    const {data, isLoading, error} = useSWR(firstDataUrl, fetcher,{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    if (isLoading) return <div>Loading...</div>

    if (error) return <CustomErrorPage />

    if (data) return <ProductsPageByType pageData={data} />

};

export default ProductsPageRoute;
