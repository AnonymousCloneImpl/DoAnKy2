import React from 'react';
import useSWR from "swr";
import fetcher from "@/utils/fetchAPI";
import BuildPcComponents from "@/components/BuildPCList/build-pc-components";
import CustomErrorPage from "@/pages/error";

const PartsList = ({ onPartSelect }) => {

  const { data, error } = useSWR(`${process.env.DOMAIN}/build-pc`, fetcher);

  if (error) return <CustomErrorPage />;

  if (data) return <BuildPcComponents data={data} />;

};

export default PartsList;
