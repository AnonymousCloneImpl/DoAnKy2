import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const PartsList = ({ onPartSelect }) => {
    const [selectedProducts, setSelectedProducts] = useState({
        cpu: '',
        monitor: ''
        // Add other parts here as needed
    });

    const [quantities, setQuantities] = useState({
        cpu: 1,
        monitor: 1
        // Add other parts here as needed
    });

    const [currentComponent, setCurrentComponent] = useState('');

    const cpuPrice = selectedProducts.cpu === 'Intel Core i9-10900K' ? 399 : selectedProducts.cpu === 'AMD Ryzen 9 5900X' ? 499 : 0;
    const monitorPrice = selectedProducts.monitor === 'Dell S2721QS' ? 299 : 0;

    const totalPrice = cpuPrice * quantities.cpu + monitorPrice * quantities.monitor;

    const handleSelectProduct = (partType, productName) => {
        setSelectedProducts({ ...selectedProducts, [partType]: productName });
        setFormVisible(false); // Close the modal after selecting a product
    };

    const handleRemoveProduct = (partType) => {
        setSelectedProducts({ ...selectedProducts, [partType]: '' });
    };

    const handleQuantityChange = (partType, value) => {
        setQuantities({ ...quantities, [partType]: value });
    };

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

    const availableProducts = {
        cpu: ['Intel Core i9-10900K', 'AMD Ryzen 9 5900X'],
        monitor: ['Dell S2721QS']
        // Add other parts here as needed
    };

    return (
        <div className="flex justify-center pt-8">
            <div className="w-full max-w-screen-xl">
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Selected Products Total Price: ${totalPrice}</h2>
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
                        <td className="border px-6 py-3 font-bold">CPU</td>
                        <td className="border px-6 py-3">
                            {selectedProducts.cpu ? (
                                <div className="flex items-center">
                                    <img className="h-20" src="https://hanoicomputercdn.com/media/product/80691_cpu_amd_ryzen_7_5700_4_6_ghz_upto_3_7_ghz_20mb_8_cores_16_threads_65w_socket_am5.jpg" alt="no image"></img>
                                    <span className="font-bold"><Link href="/">{selectedProducts.cpu}</Link></span>
                                </div>

                            ) : (
                                <button onClick={() => openForm('cpu')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><FontAwesomeIcon className="text-xl font-semibold" icon={faPlus} /> Select CPU</button>
                            )}
                        </td>
                        <td className="border px-6 py-3">${cpuPrice}</td>
                        <td className="border px-6 py-3">
                            <input type="number" min="1" value={quantities.cpu} onChange={(e) => handleQuantityChange('cpu', e.target.value)} className="w-16 px-2 py-1 border rounded" />
                        </td>
                        <td className="border px-6 py-3">${cpuPrice * quantities.cpu}</td>
                        <td className="border px-6 py-3 w-40">
                            {selectedProducts.cpu && (
                                <div className="flex justify-center w-full">
                                    <button onClick={() => handleRemoveProduct('cpu')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
                                </div>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-6 py-3 font-bold">Monitor</td>
                        <td className="border px-6 py-3">
                            {selectedProducts.monitor ? (
                                <span>{selectedProducts.monitor}</span>
                            ) : (
                                <button onClick={() => openForm('monitor')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><FontAwesomeIcon className="text-xl font-semibold" icon={faPlus} /> Select Monitor</button>
                            )}
                        </td>
                        <td className="border px-6 py-3">${monitorPrice}</td>
                        <td className="border px-6 py-3">
                            <input type="number" min="1" value={quantities.monitor} onChange={(e) => handleQuantityChange('monitor', e.target.value)} className="w-16 px-2 py-1 border rounded" />
                        </td>
                        <td className="border px-6 py-3">${monitorPrice * quantities.monitor}</td>
                        <td className="border px-6 py-3">
                            {selectedProducts.monitor && (
                                <>
                                    <button onClick={() => handleRemoveProduct('monitor')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove</button>
                                </>
                            )}
                        </td>
                    </tr>
                    {/* Repeat for other parts */}
                    </tbody>
                </table>
            </div>
            {isFormVisible && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeForm}></div>
                    <div className="bg-white p-8 rounded shadow-xl max-w-sm mx-auto z-50">
                        <h2 className="text-lg font-semibold mb-4">Select {currentComponent.toUpperCase()}</h2>
                        <ul>
                            {availableProducts[currentComponent].map(product => (
                                <li key={product} onClick={() => handleSelectProduct(currentComponent, product)}>{product}</li>
                            ))}
                        </ul>
                        <button onClick={closeForm} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartsList;
