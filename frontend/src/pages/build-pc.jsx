import React from 'react';
import useSWR from "swr";
import fetcher from "@/utils/fetchAPI";
import BuildPcComponents from "@/components/BuildPCList/build-pc-components";

const PartsList = ({onPartSelect}) => {

    const {data, error} = useSWR('http://localhost:8080/build-pc', fetcher);

    if (data) return <BuildPcComponents data={data}/>

};

export default PartsList;
