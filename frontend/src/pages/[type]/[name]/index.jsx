import React from 'react';
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/fetchAPI";
import CustomErrorPage from "@/pages/error";
import ProductPage from "@/components/products/ProductPage";
import Loading from "@/components/Loading";

const ProductDetailPage = () => {
  const router = useRouter();
  const query = router.query;

  const type = query?.type?.replaceAll("-", " ");
  const name = query.name;
  const model = query.model;

  const firstDataUrl = `${process.env.DOMAIN}/products/${type}/${name}?model=${model}`;

  const { data, isLoading, error } = useSWR(firstDataUrl, fetcher)

  if (error) return <CustomErrorPage />

  if (isLoading || data === undefined ||
    type === undefined || type === null ||
    name === undefined || name === null ||
    model === undefined || model === null
  ) {
    return <Loading />;
  }

  return <ProductPage productBE={data} />
};

export default ProductDetailPage;
