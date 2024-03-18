import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import CustomErrorPage from "@/pages/error";
import ComponentList from "@/components/BuildPCList/ComponentList";

function BuildPcComponents(data) {
    const [currentComponent, setCurrentComponent] = useState('');
    const [ProductList, setProductList] = useState([]);
    const [cpu, setCpu] = useState([]);
    const [cpuCooler, setCpuCooler] = useState([]);
    const [mobo, setMobo] = useState([]);
    const [memory, setMemory] = useState([]);
    const [storage, setStorage] = useState([]);
    const [gpu, setGpu] = useState([]);
    const [pcCase, setPcCase] = useState([]);
    const [caseFan, setCaseFan] = useState([]);
    const [psu, setPsu] = useState([]);
    const [monitor, setMonitor] = useState([]);
    const [keyboard, setKeyboard] = useState([]);
    const [mouse, setMouse] = useState([]);
    const [searchQuery, setSearchQuery] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);
    const formRef = useRef(null);

    const [selectedProducts, setSelectedProducts] = useState({
        cpu: '',
        cpuCooler: '',
        motherboard: '',
        memory: '',
        storage: '',
        gpu: '',
        pcCase: '',
        caseFan: '',
        psu: '',
        monitor: '',
        keyboard: '',
        mouse: ''
    });

    const [quantities, setQuantities] = useState({
        cpu: '',
        cpuCooler: '',
        motherboard: '',
        memory: '',
        storage: '',
        gpu: '',
        pcCase: '',
        caseFan: '',
        psu: '',
        monitor: '',
        keyboard: '',
        mouse: ''
    });
//define prices
    const [cpuPrice, setCpuPrice] = useState(0);
    const [cpuCoolerPrice, setCpuCoolerPrice] = useState(0);
    const [moboPrice, setMoboPrice] = useState(0);
    const [memoryPrice, setMemoryPrice] = useState(0);
    const [storagePrice, setStoragePrice] = useState(0);
    const [gpuPrice, setGpuPrice] = useState(0);
    const [pcCasePrice, setPcCasePrice] = useState(0);
    const [caseFanPrice, setCaseFanPrice] = useState(0);
    const [psuPrice, setPsuPrice] = useState(0);
    const [monitorPrice, setMonitorPrice] = useState(0);
    const [kbPrice, setKbPrice] = useState(0);
    const [mousePrice, setMousePrice] = useState(0);
//define image paths
    const [cpuImage, setCpuImage] = useState('');
    const [cpuCoolerImage, setCpuCoolerImage] = useState('');
    const [moboImage, setMoboImage] = useState('');
    const [memoryImage, setMemoryImage] = useState('');
    const [storageImage, setStorageImage] = useState('');
    const [gpuImage, setGpuImage] = useState('');
    const [pcCaseImage, setPcCaseImage] = useState('');
    const [caseFanImage, setCaseFanImage] = useState('');
    const [psuImage, setPsuImage] = useState('');
    const [monitorImage, setMonitorImage] = useState('');
    const [kbImage, setKbImage] = useState('');
    const [mouseImage, setMouseImage] = useState('');
    //define stock number
    const [cpuStock, setCpuStock] = useState(0);
    const [cpuCoolerStock, setCpuCoolerStock] = useState(0);
    const [moboStock, setMoboStock] = useState(0);
    const [memoryStock, setMemoryStock] = useState(0);
    const [storageStock, setStorageStock] = useState(0);
    const [gpuStock, setGpuStock] = useState(0);
    const [pcCaseStock, setPcCaseStock] = useState(0);
    const [caseFanStock, setCaseFanStock] = useState(0);
    const [psuStock, setPsuStock] = useState(0);
    const [monitorStock, setMonitorStock] = useState(0);
    const [kbStock, setKbStock] = useState(0);
    const [mouseStock, setMouseStock] = useState(0);


    useEffect(() => {
        if (data === undefined) {
            return <CustomErrorPage/>;
        }
        setCpu(data.data.cpuList);
        setCpuCooler(data.data.cpuCoolerList)
        setMobo(data.data.motherBoardList)
        setMemory(data.data.memoryList)
        setStorage(data.data.storageList)
        setGpu(data.data.gpuList)
        setPcCase(data.data.caseList)
        setCaseFan(data.data.caseFanList)
        setPsu(data.data.psuList)
        setMonitor(data.data.moniterList)
        setKeyboard(data.data.keyboardList);
        setMouse(data.data.mouseList);
    }, []);

    const openForm = (component) => {
        setCurrentComponent(component);
        setFormVisible(true);
        switch (component) {
            case 'cpu':
                setProductList(cpu);
                break;
            case 'cpuCooler':
                setCpuCooler(cpuCooler);
                break;
            case 'motherboard':
                setMobo(mobo);
                break;
            case 'memory':
                setMemory(memory);
                break;
            case 'storage':
                setStorage(storage);
                break;
            case 'gpu':
                setGpu(gpu);
                break;
            case 'pcCase':
                setPcCase(pcCase);
                break;
            case 'caseFan':
                setCaseFan(caseFan);
                break;
            case 'psu':
                setPsu(psu);
                break;
            case 'monitor':
                setMonitor(monitor);
                break;
            case 'keyboard':
                setProductList(keyboard);
                break;
            case 'mouse':
                setProductList(mouse);
                break;
            default:
                setProductList([]);
                break;
        }
    };

    const closeForm = () => {
        setCurrentComponent('');
        setFormVisible(false);
    };

    const hasSelectedProducts = Object.values(selectedProducts).some(product => product !== '');

    const totalPrice =
        (cpuPrice * quantities.cpu) +
        (cpuCoolerPrice * quantities.cpuCooler) +
        (moboPrice * quantities.mobo) +
        (memoryPrice * quantities.memory) +
        (storagePrice * quantities.storage) +
        (gpuPrice * quantities.gpu) +
        (pcCasePrice * quantities.pcCase) +
        (caseFanPrice * quantities.caseFan) +
        (psuPrice * quantities.psu) +
        (monitorPrice * quantities.monitor) +
        (kbPrice * quantities.keyboard) +
        (mousePrice * quantities.mouse);

    const handleSelectProduct = (partType, productName, productPrice, productImage, productStock) => {
        setSelectedProducts({...selectedProducts, [partType]: productName});
        setQuantities({...quantities, [partType]: 1});
        setFormVisible(false); // Close the modal after selecting a product

        // Update the price state variable based on the selected product
        switch (partType) {
            case 'cpu':
                setCpuPrice(productPrice);
                setCpuImage(productImage);
                setCpuStock(productStock);
                break;
            case 'cpuCooler':
                setCpuCoolerPrice(productPrice);
                setCpuCoolerImage(productImage);
                setCpuCoolerStock(productStock);
                break;
            case 'mobo':
                setMoboPrice(productPrice);
                setMoboImage(productImage);
                setMoboStock(productStock);
                break;
            case 'memory':
                setMemoryPrice(productPrice);
                setMemoryImage(productImage);
                setMemoryStock(productStock);
                break;
            case 'storage':
                setStoragePrice(productPrice);
                setStorageImage(productImage);
                setStorageStock(productStock);
                break;
            case 'gpu':
                setGpuPrice(productPrice);
                setGpuImage(productImage);
                setGpuStock(productStock);
                break;
            case 'pcCase':
                setPcCasePrice(productPrice);
                setPcCaseImage(productImage);
                setPcCaseStock(productStock);
                break;
            case 'caseFan':
                setCaseFanPrice(productPrice);
                setCaseFanImage(productImage);
                setCaseFanStock(productStock);
                break;
            case 'psu':
                setPsuPrice(productPrice);
                setPsuImage(productImage);
                setPsuStock(productStock);
                break;
            case 'monitor':
                setMonitorPrice(productPrice);
                setMonitorImage(productImage);
                setMonitorStock(productStock);
                break;
            case 'keyboard':
                setKbPrice(productPrice);
                setKbImage(productImage);
                setKbStock(productStock);
                break;
            case 'mouse':
                setMousePrice(productPrice);
                setMouseImage(productImage);
                setMouseStock(productStock);
                break;
            default:
                break;
        }

    };

    const handleRemoveProduct = (partType) => {
        const confirmed = window.confirm('Are you sure you want to remove this product?');
        if (confirmed) {
            setSelectedProducts({...selectedProducts, [partType]: ''});
            setQuantities({...quantities, [partType]: ''});
            switch (partType) {
                case 'cpu':
                    setCpuPrice(0);
                    setCpuImage('');
                    setCpuStock(0);
                    break;
                case 'cpuCooler':
                    setCpuCoolerPrice(0);
                    setCpuCoolerImage('');
                    setCpuCoolerStock(0);
                    break;
                case 'mobo':
                    setMoboPrice(0);
                    setMoboImage('');
                    setMoboStock(0);
                    break;
                case 'memory':
                    setMemoryPrice(0);
                    setMemoryImage('');
                    setMemoryStock(0);
                    break;
                case 'storage':
                    setStoragePrice(0);
                    setStorageImage('');
                    setStorageStock(0);
                    break;
                case 'gpu':
                    setGpuPrice(0);
                    setGpuImage('');
                    setGpuStock(0);
                    break;
                case 'pcCase':
                    setPcCasePrice(0);
                    setPcCaseImage('');
                    setPcCaseStock(0);
                    break;
                case 'caseFan':
                    setCaseFanPrice(0);
                    setCaseFanImage('');
                    setCaseFanStock(0);
                    break;
                case 'psu':
                    setPsuPrice(0);
                    setPsuImage('');
                    setPsuStock(0);
                    break;
                case 'monitor':
                    setMonitorPrice(0);
                    setMonitorImage('');
                    setMonitorStock(0);
                    break;
                case 'keyboard':
                    setKbPrice(0);
                    setKbImage('');
                    setKbStock(0);
                    break;
                case 'mouse':
                    setMousePrice(0);
                    setMouseImage('');
                    setMouseStock(0);
                    break;
                default:
                    break;
            }
        }
    };

    const handleRemoveAllProducts = () => {
        const confirmed = window.confirm('Are you sure you want to start a new build?');
        if (confirmed) {
            setSelectedProducts({
                cpu: '',
                cpuCooler: '',
                motherboard: '',
                memory: '',
                storage: '',
                gpu: '',
                pcCase: '',
                caseFan: '',
                psu: '',
                monitor: '',
                keyboard: '',
                mouse: ''
            });
            setQuantities({
                cpu: '',
                cpuCooler: '',
                motherboard: '',
                memory: '',
                storage: '',
                gpu: '',
                pcCase: '',
                caseFan: '',
                psu: '',
                monitor: '',
                keyboard: '',
                mouse: ''
            });
            setCpuPrice(0);
            setCpuImage('');
            setCpuStock(0);
            setCpuCoolerPrice(0);
            setCpuCoolerImage('');
            setCpuCoolerStock(0);
            setMoboPrice(0);
            setMoboImage('');
            setMoboStock(0);
            setMemoryPrice(0);
            setMemoryImage('');
            setMemoryStock(0);
            setStoragePrice(0);
            setStorageImage('');
            setStorageStock(0);
            setGpuPrice(0);
            setGpuImage('');
            setGpuStock(0);
            setPcCasePrice(0);
            setPcCaseImage('');
            setPcCaseStock(0);
            setCaseFanPrice(0);
            setCaseFanImage('');
            setCaseFanStock(0);
            setPsuPrice(0);
            setPsuImage('');
            setPsuStock(0);
            setMonitorPrice(0);
            setMonitorImage('');
            setMonitorStock(0);
            setKbPrice(0);
            setKbImage('');
            setKbStock(0);
            setMousePrice(0);
            setMouseImage('');
            setMouseStock(0);
        }
    };


    const handleQuantityChange = (partType, value) => {
        setQuantities({...quantities, [partType]: value});
    };


    return (
        <div className="w-full" style={{backgroundColor: "#EDEEF2"}}>
            {/*<div className="fixed left-0 top-40 bottom-0 flex-none custom-width-5 bg-red-200 h-96">AD HERE</div>*/}
            {/*<div className="fixed top-40 bottom-0 flex-none custom-width-5 bg-blue-200 right-0 h-96">AD HERE</div>*/}
            <div className="build-pc-wrapper flex justify-center pt-8 custom-width-11-12 bg-white">
                <div className="w-full max-w-screen-xl">
                    <div className="banner w-full h-96 bg-cover bg-center mb-2"
                         style={{backgroundImage: "url('https://smcinternational.in/extra/images/SMC%20Banner.jpg')"}}>
                    </div>
                    <div className="build-pc-header text-left mb-4">
                        <h2 className="text-2xl font-bold">
                            Build your own dream PC
                        </h2>
                        <hr className="my-2"/>
                        <p className="text-sm font-semibold">
                            Please select the component you want for your own PC build
                        </p>
                    </div>
                    <div className="support-info bg-yellow-300 text-black text-center p-4 mb-4">
                        <p className="mb-2 font-semibold">
                            Not sure how to get the best bang for your buck? Let our professional advisor team help with
                            your dream PC build.
                        </p>
                        <button
                            className="chat-button bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                            Contact an Advisor now
                        </button>
                    </div>

                    <div className="flex w-full justify-end">
                        {hasSelectedProducts && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 my-2 rounded"
                                onClick={handleRemoveAllProducts}>Start New
                            </button>
                        )}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 my-2 rounded"> Add
                            all parts to cart
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <table style={{width: "732px", borderCollapse: "collapse"}}>
                            <tbody>
                            <tr>
                                <td style={{width: '70%'}}
                                    className="text-lg mb-2 bg-red-600 text-white border border-white px-2 py-1">
                                    Total Price:
                                </td>
                                <td className="text-lg font-bold bg-red-600 text-white text-right border border-white px-2 py-1">
                                    ${totalPrice}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <table className="w-full table-auto">
                        <thead>
                        <tr>
                            <th className="px-6 py-3">Component</th>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Quantity</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border px-6 py-3 font-bold" style={{width: '5%'}}>CPU</td>
                            <td className="border px-6 py-3" style={{width: '65%'}}>
                                {selectedProducts.cpu ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={cpuImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.cpu}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.cpu ? (
                                                        <span>
                                                            {cpuStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {cpuStock > 0 && cpuStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {cpuStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('cpu')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select CPU
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3" style={{width: '5%'}}>${cpuPrice}</td>
                            <td className="border text-center px-6 py-3" style={{width: '5%'}}>
                                <input type="number" min="1" value={quantities.cpu}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('cpu', 1);
                                           } else {
                                               handleQuantityChange('cpu', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${cpuPrice * quantities.cpu}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40" style={{width: '15%'}}>
                                {selectedProducts.cpu && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('cpu')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>

                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">CPU Cooler</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.cpuCooler ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={cpuCoolerImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.cpuCooler}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.cpuCooler ? (
                                                        <span>
                                                            {cpuCoolerStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {cpuCoolerStock > 0 && cpuCoolerStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {cpuCoolerStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('cpuCooler')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select CPU
                                        Cooler
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${cpuCoolerPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.cpuCooler}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('cpuCooler', 1);
                                           } else {
                                               handleQuantityChange('cpuCooler', e.target.value);
                                           }
                                       }} className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${cpuCoolerPrice * quantities.cpuCooler}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.cpuCooler && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('cpuCooler')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Motherboard</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.motherboard ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={moboImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.motherboard}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.motherboard ? (
                                                        <span>
                                                            {moboStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {moboStock > 0 && moboStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {moboStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('motherboard')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select
                                        Motherboard
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3"
                            >${moboPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.motherboard}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('motherboard', 1);
                                           } else {
                                               handleQuantityChange('motherboard', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${moboPrice * quantities.mobo}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.motherboard && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('motherboard')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>

                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Memory</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.memory ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={memoryImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.memory}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.memory ? (
                                                        <span>
                                                            {memoryStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {memoryStock > 0 && memoryStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {memoryStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('memory')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select Memory
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${memoryPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.memory}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('memory', 1);
                                           } else {
                                               handleQuantityChange('memory', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${memoryPrice * quantities.memory}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.memory && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('memory')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>

                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Storage</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.storage ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={storageImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.storage}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.storage ? (
                                                        <span>
                                                            {storageStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {storageStock > 0 && storageStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {storageStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('storage')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select
                                        Storage
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${storagePrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.storage}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('storage', 1);
                                           } else {
                                               handleQuantityChange('storage', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${storagePrice * quantities.storage}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.storage && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('storage')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>

                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">GPU</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.gpu ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={gpuImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.gpu}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.gpu ? (
                                                        <span>
                                                            {gpuStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {gpuStock > 0 && gpuStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {gpuStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('gpu')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select GPU
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${gpuPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.gpu}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('gpu', 1);
                                           } else {
                                               handleQuantityChange('gpu', e.target.value);
                                           }
                                       }} className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${gpuPrice * quantities.gpu}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.gpu && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('gpu')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>

                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Case</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.pcCase ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={pcCaseImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.pcCase}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.pcCase ? (
                                                        <span>
                                                            {pcCaseStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {pcCaseStock > 0 && pcCaseStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {pcCaseStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('case')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select Case
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${pcCasePrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.pcCase}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('case', 1);
                                           } else {
                                               handleQuantityChange('case', e.target.value);
                                           }
                                       }} className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${pcCasePrice * quantities.pcCase}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.pcCase && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('case')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Case Fan</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.caseFan ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={caseFanImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.caseFan}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.caseFan ? (
                                                        <span>
                                                            {caseFanStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {caseFanStock > 0 && caseFanStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {caseFanStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('caseFan')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select Case
                                        Fan
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${caseFanPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.caseFan}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('caseFan', 1);
                                           } else {
                                               handleQuantityChange('caseFan', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${caseFanPrice * quantities.caseFan}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.caseFan && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('caseFan')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Power Supply Unit</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.psu ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={psuImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.psu}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.psu ? (
                                                        <span>
                                                            {psuStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {psuStock > 0 && psuStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {psuStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('psu')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select PSU
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${psuPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.psu}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('psu', 1);
                                           } else {
                                               handleQuantityChange('psu', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${psuPrice * quantities.psu}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.psu && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('psu')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Monitor</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.monitor ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={monitorImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.monitor}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.monitor ? (
                                                        <span>
                                                            {monitorStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {monitorStock > 0 && monitorStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {monitorStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('monitor')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select CPU
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${monitorPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.monitor}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('monitor', 1);
                                           } else {
                                               handleQuantityChange('monitor', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${monitorPrice * quantities.monitor}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.monitor && (
                                    <>
                                        <div className="flex justify-center w-full">
                                            <div className="flex justify-center w-full">
                                                <button
                                                    onClick={() => handleRemoveProduct('monitor')}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                                    style={{transition: "background-color 0.3s"}}
                                                >
                                                    <span className="fill"></span>
                                                    <span className="relative z-10">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>


                        <tr>
                            <td className="border px-6 py-3 font-bold">Keyboard</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.keyboard ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={kbImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.keyboard}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.keyboard ? (
                                                        <span>
                                                            {kbStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {kbStock > 0 && kbStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {kbStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('keyboard')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select
                                        Keyboard
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${kbPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.keyboard}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('keyboard', 1);
                                           } else {
                                               handleQuantityChange('keyboard', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${kbPrice * quantities.keyboard}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.keyboard && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('keyboard')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td className="border px-6 py-3 font-bold">Mouse</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.mouse ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={mouseImage}
                                                 alt="no image"/>
                                            <p>
                                                <span className="ml-1 font-bold">
                                                    <Link href="/public">
                                                        {selectedProducts.mouse}
                                                    </Link>
                                                </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                                                    {selectedProducts.mouse ? (
                                                        <span>
                                                            {mouseStock === 0 &&
                                                                <span style={{color: 'red'}}>Out of Stock</span>}
                                                            {mouseStock > 0 && mouseStock < 10 && <span
                                                                style={{color: 'darkorange'}}>Limited Stock left</span>}
                                                            {mouseStock >= 10 &&
                                                                <span style={{color: 'green'}}>Available</span>}
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('mouse')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select Mouse
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${mousePrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.mouse}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('mouse', 1);
                                           } else {
                                               handleQuantityChange('mouse', e.target.value);
                                           }
                                       }} className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{
                                    width: '5%',
                                    color: "red",
                                    fontWeight: "bold"
                                }}>${mousePrice * quantities.mouse}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.mouse && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('mouse')}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 rounded relative overflow-hidden"
                                            style={{transition: "background-color 0.15s"}}
                                        >
                                            <span className="fill"></span>
                                            <span className="relative z-10">Remove</span>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>

                        </tbody>
                    </table>

                    <div className="flex justify-end mt-1">
                        <table style={{width: "732px", borderCollapse: "collapse"}}>
                            <tbody>
                            <tr>
                                <td style={{width: '70%'}}
                                    className="text-lg mb-2 bg-red-600 text-white border border-white px-2 py-1">
                                    Total Price:
                                </td>
                                <td className="text-lg font-bold bg-red-600 text-white text-right border border-white px-2 py-1">
                                    ${totalPrice}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex w-full justify-end">
                        {hasSelectedProducts && (
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 my-2 rounded"
                                onClick={handleRemoveAllProducts}>Start New
                            </button>
                        )}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 my-2 rounded"> Add
                            all parts to cart
                        </button>
                    </div>
                </div>

                {isFormVisible && (
                    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
                             onClick={closeForm}></div>
                        <div className="bg-white p-8 rounded shadow-xl max-w-3xl mx-auto z-50">
                            <h2 className="text-lg font-semibold mb-4">Select {currentComponent.toUpperCase()}</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <ComponentList data={ProductList} currentComponent={currentComponent}
                                               handleSelectProduct={handleSelectProduct}/>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button onClick={closeForm}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}

export default BuildPcComponents;