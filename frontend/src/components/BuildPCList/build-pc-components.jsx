import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";

function BuildPcComponents(data){

    const [keyboard,setKeyboard] = useState([]);

    if(data !== undefined){
        setKeyboard(data.keyboardList);
    }

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


    //pop-up for list
    const [isFormVisible, setFormVisible] = useState(false);
    const formRef = useRef(null);

    const openForm = (component) => {
        setCurrentComponent(component);
        setFormVisible(true);
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
        (casePrice * quantities.case) +
        (caseFanPrice * quantities.caseFan) +
        (psuPrice * quantities.psu) +
        (monitorPrice * quantities.monitor) +
        (kbPrice * quantities.kb) +
        (mousePrice * quantities.mouse);


    const handleSelectProduct = (partType, productName) => {
        setSelectedProducts({...selectedProducts, [partType]: productName});
        setQuantities({...quantities, [partType]: 1});
        setFormVisible(false); // Close the modal after selecting a product
    };

    const handleRemoveProduct = (partType) => {
        const confirmed = window.confirm('Are you sure you want to remove this product?');
        if (confirmed) {
            setSelectedProducts({...selectedProducts, [partType]: ''});
            setQuantities({...quantities, [partType]: ''});
        }
        ;
    };


    return (
        <div className="w-full" style={{backgroundColor: "#EDEEF2"}}>
            {/*<div className="fixed left-0 top-40 bottom-0 flex-none custom-width-5 bg-red-200 h-96">AD HERE</div>*/}
            {/*<div className="fixed top-40 bottom-0 flex-none custom-width-5 bg-blue-200 right-0 h-96">AD HERE</div>*/}
            <div className="build-pc-wrapper flex justify-center pt-8 custom-width-11-12 bg-white">
                <div className="w-full max-w-screen-xl">
                    <div className="build-pc-header text-left mb-4">
                        <h2 className="text-2xl font-bold">
                            Build your own best PC build for the cheapest price
                        </h2>
                        <hr className="my-2"/>
                        <p className="text-sm font-semibold">
                            Please select the component you want for your own PC build
                        </p>
                    </div>
                    <div className="support-info bg-yellow-300 text-black text-center p-4 mb-4">
                        <p className="mb-2 font-semibold">
                            Not sure how to get the best bang for your buck? Let our professional advisor team help with your dream PC build.
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
                                                 src="https://hanoicomputercdn.com/media/product/80691_cpu_amd_ryzen_7_5700_4_6_ghz_upto_3_7_ghz_20mb_8_cores_16_threads_65w_socket_am5.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.cpu}</Link></span>
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
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${cpuPrice * quantities.cpu}</td>
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
                                                 src="https://i.pcmag.com/imagery/roundup-products/03fJvvPEIYb8K2OdKYkYNvc..v1646970857.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.cpuCooler}</Link></span>
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
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${cpuCoolerPrice * quantities.cpuCooler}</td>
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
                                {selectedProducts.mobo ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src="https://nguyencongpc.vn/media/product/23490-mainboard-asus-rog-crosshair-x670e-extreme-11.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.mobo}</Link></span>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('mobo')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select
                                        Motherboard
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3"
                            >${moboPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.mobo}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('mobo', 1);
                                           } else {
                                               handleQuantityChange('mobo', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${moboPrice * quantities.mobo}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.mobo && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('mobo')}
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
                                                 src="https://edgeup.asus.com/wp-content/uploads/2023/03/VENGEANCE_RGB_DDR5_BLACK_RENDER_07.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.memory}</Link></span>
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
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${memoryPrice * quantities.memory}</td>
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
                                                 src="https://product.hstatic.net/200000522285/product/61mo8ug0aqs_81dd526d97a746d78995559902e00535_1024x1024.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.storage}</Link></span>
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
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${storagePrice * quantities.storage}</td>
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
                                                 src="https://tanthanhdanh.vn/wp-content/uploads/2022/09/ROG-STRIX-RTX4090-O24G-GAMING-TTD-2.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.gpu}</Link></span>
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
                                       }}className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${gpuPrice * quantities.gpu}</td>
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
                                {selectedProducts.case ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src="https://product.hstatic.net/200000837185/product/case-corsair-5000d-airflow-black-_-atx-dd02e_73a740a3ffd04b1da47a58e56040709a_master.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.case}</Link></span>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('case')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select Case
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${casePrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.case}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('case', 1);
                                           } else {
                                               handleQuantityChange('case', e.target.value);
                                           }
                                       }}className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${casePrice * quantities.case}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.case && (
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
                                                 src="https://images-cdn.ubuy.co.id/633fedd6ac7db9648f527a13-antec-120mm-case-fan-rgb-case-fans-3.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.caseFan}</Link></span>
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
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${caseFanPrice * quantities.caseFan}</td>
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
                                                 src="https://tanthanhdanh.vn/wp-content/uploads/2023/06/CP-9020261_08.png"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.psu}</Link></span>
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
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${psuPrice * quantities.psu}</td>
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
                                                 src="https://phucanhcdn.com/media/product/42173_s2721h_ha1.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.monitor}</Link></span>
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
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${monitorPrice * quantities.monitor}</td>
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
                                {selectedProducts.kb ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src="https://m.media-amazon.com/images/I/61vPhOdqAHL._AC_UF894,1000_QL80_.jpg"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.kb}</Link></span>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('kb')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select
                                        Keyboard
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">${kbPrice}</td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.kb}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('kb', 1);
                                           } else {
                                               handleQuantityChange('kb', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${kbPrice * quantities.kb}</td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.kb && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('kb')}
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
                                                 src="https://bizweb.dktcdn.net/100/450/414/products/a344c252-2570-4356-90c8-1073a5ea0ded.jpg?v=1648894363560"
                                                 alt="no image"/>
                                            <span className="ml-1 font-bold"><Link
                                                href="/public">{selectedProducts.mouse}</Link></span>
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
                                       }}className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3"
                                style={{width: '5%', color:"red", fontWeight:"bold"}}>${mousePrice * quantities.mouse}</td>
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
                                {availableProducts[currentComponent]
                                    .filter(productName => productName.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(productName => {
                                        let price = 0;
                                        // Get the price based on the current product name
                                        if (currentComponent === 'cpu') {
                                            price = productName === 'Intel Core i9-10900K' ? 399 :
                                                productName === 'AMD Ryzen 9 5900X' ? 499 : 0;
                                        } else if (currentComponent === 'monitor') {
                                            price = productName === 'Dell S2721QS' ? 299 : 0;
                                        } else if (currentComponent === 'cpuCooler') {
                                            price = productName === 'Cooler A' ? 100 :
                                                productName === 'Cooler B' ? 150 : 0;
                                        } else if (currentComponent === 'mobo') {
                                            price = productName === 'Motherboard X' ? 200 :
                                                productName === 'Motherboard Y' ? 250 : 0;
                                        } else if (currentComponent === 'memory') {
                                            price = productName === 'Memory A' ? 50 :
                                                productName === 'Memory B' ? 75 : 0;
                                        } else if (currentComponent === 'storage') {
                                            price = productName === 'SSD X' ? 80 :
                                                productName === 'SSD Y' ? 100 : 0;
                                        } else if (currentComponent === 'gpu') {
                                            price = productName === 'GPU A' ? 300 :
                                                productName === 'GPU B' ? 400 : 0;
                                        } else if (currentComponent === 'case') {
                                            price = productName === 'Case A' ? 70 :
                                                productName === 'Case B' ? 90 : 0;
                                        } else if (currentComponent === 'caseFan') {
                                            price = productName === 'Fan A' ? 20 :
                                                productName === 'Fan B' ? 30 : 0;
                                        } else if (currentComponent === 'psu') {
                                            price = productName === 'PSU A' ? 100 :
                                                productName === 'PSU B' ? 120 : 0;
                                        } else if (currentComponent === 'kb') {
                                            price = productName === 'Keyboard A' ? 50 :
                                                productName === 'Keyboard B' ? 60 : 0;
                                        } else if (currentComponent === 'mouse') {
                                            price = productName === 'Mouse A' ? 20 :
                                                productName === 'Mouse B' ? 30 : 0;
                                        }
                                        return (
                                            <div key={productName}
                                                 className="flex p-4 bg-gray-100 rounded-md mb-4 items-center">
                                                <div className="flex-none w-16 h-16 bg-gray-200 mr-4">
                                                    <img src="https://phucanhcdn.com/media/product/42173_s2721h_ha1.jpg"
                                                         alt=""></img>
                                                </div>
                                                {/* Placeholder for image */}
                                                <div className="flex-grow">
                                                    <h3 className="text-lg font-semibold">{productName}</h3>
                                                    <p className="text-gray-600">${price}</p>
                                                    <p>lorem ipsum</p>
                                                </div>
                                                <button
                                                    onClick={() => handleSelectProduct(currentComponent, productName)}
                                                    className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add
                                                </button>
                                            </div>
                                        );
                                    })}
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