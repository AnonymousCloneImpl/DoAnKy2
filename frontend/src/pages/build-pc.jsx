import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/utils/fetchAPI";
import buildPcComponents from "@/components/BuildPCList/build-pc-components";
import BuildPcComponents from "@/components/BuildPCList/build-pc-components";

const PartsList = ({onPartSelect}) => {

    const [keyboard,setKeyboard] = useState([]);

    const {data, error} = useSWR('http://localhost:8080/build-pc',fetcher);


    const [selectedProducts, setSelectedProducts] = useState({
        cpu: '',
        cpuCooler: '',
        mobo: '',
        memory: '',
        storage: '',
        gpu: '',
        case: '',
        caseFan: '',
        psu: '',
        monitor: '',
        kb: '',
        mouse: ''
    });

    const [quantities, setQuantities] = useState({
        cpu: '',
        cpuCooler: '',
        mobo: '',
        memory: '',
        storage: '',
        gpu: '',
        case: '',
        caseFan: '',
        psu: '',
        monitor: '',
        kb: '',
        mouse: ''
    });

    const [currentComponent, setCurrentComponent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const cpuPrice = selectedProducts.cpu === 'Intel Core i9-10900K' ? 399 :
        selectedProducts.cpu === 'AMD Ryzen 9 5900X' ? 499 : 0;
    const monitorPrice = selectedProducts.monitor === 'Dell S2721QS' ? 299 :
        selectedProducts.monitor === 'Monitor B' ? 199 : selectedProducts.monitor === 'Monitor C' ? 249 : 0;
    const cpuCoolerPrice = selectedProducts.cpuCooler === 'Cooler A' ? 100 :
        selectedProducts.cpuCooler === 'Cooler B' ? 150 : 0;
    const moboPrice = selectedProducts.mobo === 'Motherboard X' ? 200 :
        selectedProducts.mobo === 'Motherboard Y' ? 250 : 0;
    const memoryPrice = selectedProducts.memory === 'Memory A' ? 50 :
        selectedProducts.memory === 'Memory B' ? 75 : 0;
    const storagePrice = selectedProducts.storage === 'SSD X' ? 80 :
        selectedProducts.storage === 'SSD Y' ? 100 : 0;
    const gpuPrice = selectedProducts.gpu === 'GPU A' ? 300 :
        selectedProducts.gpu === 'GPU B' ? 400 : 0;
    const casePrice = selectedProducts.case === 'Case A' ? 70 :
        selectedProducts.case === 'Case B' ? 90 : 0;
    const caseFanPrice = selectedProducts.caseFan === 'Fan A' ? 20 :
        selectedProducts.caseFan === 'Fan B' ? 30 : 0;
    const psuPrice = selectedProducts.psu === 'PSU A' ? 100 :
        selectedProducts.psu === 'PSU B' ? 120 : 0;
    const kbPrice = selectedProducts.kb === 'Keyboard A' ? 50 :
        selectedProducts.kb === 'Keyboard B' ? 60 : 0;
    const mousePrice = selectedProducts.mouse === 'Mouse A' ? 20 :
        selectedProducts.mouse === 'Mouse B' ? 30 : 0;





    const handleRemoveAllProducts = () => {
        const confirmed = window.confirm('Are you sure you want to start a new build?');
        if (confirmed) {
            setSelectedProducts({
                cpu: '',
                cpuCooler: '',
                mobo: '',
                memory: '',
                storage: '',
                gpu: '',
                case: '',
                caseFan: '',
                psu: '',
                monitor: '',
                kb: '',
                mouse: ''
            });
            setQuantities({
                cpu: '',
                cpuCooler: '',
                mobo: '',
                memory: '',
                storage: '',
                gpu: '',
                case: '',
                caseFan: '',
                psu: '',
                monitor: '',
                kb: '',
                mouse: ''
            });
        }
    };

    const handleQuantityChange = (partType, value) => {
        setQuantities({...quantities, [partType]: value});
    };


    const availableProducts = {
        cpu: ['Intel Core i9-10900K', 'AMD Ryzen 9 5900X', 'Hello'],
        cpuCooler: ['Cooler A', 'Cooler B', 'Cooler C'],
        mobo: ['Motherboard X', 'Motherboard Y', 'Motherboard C'],
        memory: ['Memory A', 'Memory B', 'Memory C'],
        storage: ['SSD Y', 'Storage B', 'Storage C'],
        gpu: ['GPU A', 'GPU B', 'GPU C'],
        case: ['Case A', 'Case B', 'Case C'],
        caseFan: ['Fan A', 'Fan B', 'Fan C'],
        psu: ['PSU A', 'PSU B', 'PSU C'],
        monitor: ['Dell S2721QS', 'Monitor B', 'Monitor C'],
        kb: ['Keyboard A', 'Keyboard B', 'Keyboard C'],
        mouse: ['Mouse A', 'Mouse B', 'Mouse C']
        // Add other parts and options here as needed
    };

 if (data) return <BuildPcComponents data={data} />

};

export default PartsList;
