import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/fetchAPI";
import buildPcComponents from "@/components/BuildPCList/build-pc-components";
import BuildPcComponents from "@/components/BuildPCList/build-pc-components";

const PartsList = ({onPartSelect}) => {

    const {data, error} = useSWR('http://localhost:8080/build-pc', fetcher);

    if (data) return <BuildPcComponents data={data}/>

};

export default PartsList;
