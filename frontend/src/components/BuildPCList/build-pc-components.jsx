import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import CustomErrorPage from "@/pages/error";
import ComponentList from "@/components/BuildPCList/ComponentList";
import FormatPrice from "@/components/FormatPrice";

function BuildPcComponents(data) {
    const [currentComponent, setCurrentComponent] = useState('');
    const [ProductList, setProductList] = useState([]);
    const [cpu, setCpu] = useState([]);
    const [cpuCooler, setCpuCooler] = useState([]);
    const [motherBoard, setMotherBoard] = useState([]);
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
    const [motherBoardPrice, setMotherBoardPrice] = useState(0);
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
    const [motherBoardImage, setMotherBoardImage] = useState('');
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
    const [motherBoardStock, setMotherBoardStock] = useState(0);
    const [memoryStock, setMemoryStock] = useState(0);
    const [storageStock, setStorageStock] = useState(0);
    const [gpuStock, setGpuStock] = useState(0);
    const [pcCaseStock, setPcCaseStock] = useState(0);
    const [caseFanStock, setCaseFanStock] = useState(0);
    const [psuStock, setPsuStock] = useState(0);
    const [monitorStock, setMonitorStock] = useState(0);
    const [kbStock, setKbStock] = useState(0);
    const [mouseStock, setMouseStock] = useState(0);
    //define link
    const [cpuLink, setCpuLink] = useState('');
    const [cpuCoolerLink, setCpuCoolerLink] = useState('');
    const [motherBoardLink, setMotherBoardLink] = useState('');
    const [memoryLink, setMemoryLink] = useState('');
    const [storageLink, setStorageLink] = useState('');
    const [gpuLink, setGpuLink] = useState('');
    const [pcCaseLink, setPcCaseLink] = useState('');
    const [caseFanLink, setCaseFanLink] = useState('');
    const [psuLink, setPsuLink] = useState('');
    const [monitorLink, setMonitorLink] = useState('');
    const [kbLink, setKbLink] = useState('');
    const [mouseLink, setMouseLink] = useState('');
    //define discount
    const [cpuDiscount, setCpuDiscount] = useState(0);
    const [cpuCoolerDiscount, setCpuCoolerDiscount] = useState(0);
    const [motherBoardDiscount, setMotherBoardDiscount] = useState(0);
    const [memoryDiscount, setMemoryDiscount] = useState(0);
    const [storageDiscount, setStorageDiscount] = useState(0);
    const [gpuDiscount, setGpuDiscount] = useState(0);
    const [pcCaseDiscount, setPcCaseDiscount] = useState(0);
    const [caseFanDiscount, setCaseFanDiscount] = useState(0);
    const [psuDiscount, setPsuDiscount] = useState(0);
    const [monitorDiscount, setMonitorDiscount] = useState(0);
    const [kbDiscount, setKbDiscount] = useState(0);
    const [mouseDiscount, setMouseDiscount] = useState(0);


    useEffect(() => {
        if (data === undefined) {
            return <CustomErrorPage/>;
        }
        setCpu(data.data.cpuList);
        setCpuCooler(data.data.cpuCoolerList)
        setMotherBoard(data.data.motherBoardList)
        setMemory(data.data.memoryList)
        setStorage(data.data.storageList)
        setGpu(data.data.gpuList)
        setPcCase(data.data.caseList)
        setCaseFan(data.data.caseFanList)
        setPsu(data.data.psuList)
        setMonitor(data.data.monitorList)
        setKeyboard(data.data.keyboardList);
        setMouse(data.data.mouseList);
    }, [data]);

    const openForm = (component) => {
        setCurrentComponent(component);
        setFormVisible(true);
        switch (component) {
            case 'cpu':
                setProductList(cpu);
                break;
            case 'cpuCooler':
                setProductList(cpuCooler);
                break;
            case 'motherboard':
                setProductList(motherBoard);
                break;
            case 'memory':
                setProductList(memory);
                break;
            case 'storage':
                setProductList(storage);
                break;
            case 'gpu':
                setProductList(gpu);
                break;
            case 'pcCase':
                setProductList(pcCase);
                break;
            case 'caseFan':
                setProductList(caseFan);
                break;
            case 'psu':
                setProductList(psu);
                break;
            case 'monitor':
                setProductList(monitor);
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
        ((cpuPrice - (cpuPrice * cpuDiscount / 100)) * quantities.cpu) +
        ((cpuCoolerPrice - (cpuCoolerPrice * cpuCoolerDiscount / 100)) * quantities.cpuCooler) +
        ((motherBoardPrice - (motherBoardPrice * motherBoardDiscount / 100)) * quantities.motherboard) +
        ((memoryPrice - (memoryPrice * memoryDiscount / 100)) * quantities.memory) +
        ((storagePrice - (storagePrice * storageDiscount / 100)) * quantities.storage) +
        ((gpuPrice - (gpuPrice * gpuDiscount / 100)) * quantities.gpu) +
        ((pcCasePrice - (pcCasePrice * pcCaseDiscount / 100)) * quantities.pcCase) +
        ((caseFanPrice - (caseFanPrice * caseFanDiscount / 100)) * quantities.caseFan) +
        ((psuPrice - (psuPrice * psuDiscount / 100)) * quantities.psu) +
        ((monitorPrice - (monitorPrice * monitorDiscount / 100)) * quantities.monitor) +
        ((kbPrice - (kbPrice * kbDiscount / 100)) * quantities.keyboard) +
        ((mousePrice - (mousePrice * mouseDiscount / 100)) * quantities.mouse);


    const handleSelectProduct = (partType, product, productLink) => {
        setSelectedProducts({...selectedProducts, [partType]: product.name});
        setQuantities({...quantities, [partType]: 1});
        setFormVisible(false);
        productLink = `/${product.type}/${product.name.replace(" ", "-").toLowerCase()}`

        switch (partType) {
            case 'cpu':
                setCpuLink(productLink);
                setCpuPrice(product.price);
                setCpuImage(product.image);
                setCpuStock(product.stock.quantity);
                setCpuDiscount(product.discountPercentage);
                break;
            case 'cpuCooler':
                setCpuCoolerLink(productLink);
                setCpuCoolerPrice(product.price);
                setCpuCoolerImage(product.image);
                setCpuCoolerStock(product.stock.quantity);
                setCpuCoolerDiscount(product.discountPercentage);
                break;
            case 'motherBoard':
                setMotherBoardLink(productLink);
                setMotherBoardPrice(product.price);
                setMotherBoardImage(product.image);
                setMotherBoardStock(product.stock.quantity);
                setMotherBoardDiscount(product.discountPercentage);
                break;
            case 'memory':
                setMemoryLink(productLink);
                setMemoryPrice(product.price);
                setMemoryImage(product.image);
                setMemoryStock(product.stock.quantity);
                setMemoryDiscount(product.discountPercentage);
                break;
            case 'storage':
                setStorageLink(productLink);
                setStoragePrice(product.price);
                setStorageImage(product.image);
                setStorageStock(product.stock.quantity);
                setStorageDiscount(product.discountPercentage);
                break;
            case 'gpu':
                setGpuLink(productLink);
                setGpuPrice(product.price);
                setGpuImage(product.image);
                setGpuStock(product.stock.quantity);
                setGpuDiscount(product.discountPercentage);
                break;
            case 'pcCase':
                setPcCaseLink(productLink);
                setPcCasePrice(product.price);
                setPcCaseImage(product.image);
                setPcCaseStock(product.stock.quantity);
                setPcCaseDiscount(product.discountPercentage);
                break;
            case 'caseFan':
                setCaseFanLink(productLink);
                setCaseFanPrice(product.price);
                setCaseFanImage(product.image);
                setCaseFanStock(product.stock.quantity);
                setCaseFanDiscount(product.discountPercentage);
                break;
            case 'psu':
                setPsuLink(productLink);
                setPsuPrice(product.price);
                setPsuImage(product.image);
                setPsuStock(product.stock.quantity);
                setPsuDiscount(product.discountPercentage);
                break;
            case 'monitor':
                setMonitorLink(productLink);
                setMonitorPrice(product.price);
                setMonitorImage(product.image);
                setMonitorStock(product.stock.quantity);
                setMonitorDiscount(product.discountPercentage);
                break;
            case 'keyboard':
                setKbLink(productLink);
                setKbPrice(product.price);
                setKbImage(product.image);
                setKbStock(product.stock.quantity);
                setKbDiscount(product.discountPercentage);
                break;
            case 'mouse':
                setMouseLink(productLink);
                setMousePrice(product.price);
                setMouseImage(product.image);
                setMouseStock(product.stock.quantity);
                setMouseDiscount(product.discountPercentage);
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
                case 'motherBoard':
                    setMotherBoardPrice(0);
                    setMotherBoardImage('');
                    setMotherBoardStock(0);
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
            setMotherBoardPrice(0);
            setMotherBoardImage('');
            setMotherBoardStock(0);
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

    const [cartNotifications, setCartNotifications] = useState([]);
    // Add To cart
    const addToCart = (selectedProducts, quantities, data) => {
        let cartItems = JSON.parse(localStorage.getItem('itemList')) || [];
        Object.entries(selectedProducts).forEach(([type, name]) => {
            if (name !== '') {
                const quantity = quantities[type] || 0;
                if (data.data[type + 'List'].length > 0) {
                    let productList = data.data[type + 'List'];
                    let productIndex = cartItems.findIndex(item => item.name === name && item.type === type);

                    if (productIndex !== -1) {
                        cartItems[productIndex].quantity = parseInt(quantity);
                    } else {
                        let product = productList.find(item => item.name === name);
                        if (product) {
                            const cartProduct = {
                                id: product.id,
                                image: product.image,
                                name: product.name,
                                price: product.price,
                                discountPercentage: product.discountPercentage,
                                type: type,
                                quantity: parseInt(quantity),
                                stock: null
                            };
                            cartItems.push(cartProduct);
                        }
                    }
                }
            }
        });
        localStorage.setItem('itemList', JSON.stringify(cartItems));

        const newNotification = {
            message: 'All components have been added to the cart !',
        };

        setCartNotifications((prevNotifications) => [...prevNotifications, newNotification]);

        setTimeout(() => {
            setCartNotifications((prevNotifications) => prevNotifications.filter((n) => n !== newNotification));
        }, 3000);

        return null;
    };

    return (
        <div className="w-full" style={{backgroundColor: "#EDEEF2"}}>
            <div className="build-pc-wrapper flex justify-center pt-8 custom-width-11-12 bg-white">
                <div className="w-full max-w-screen-xl">
                    <div className="banner w-full h-96 bg-cover bg-center mb-2"
                         style={{backgroundImage: "url('https://smcinternational.in/extra/images/SMC%20Banner.jpg')"}}>
                        <div className="h-16 w-64 bg-black"
                             style={{top: "59%", left: "24%", position: "absolute"}}></div>
                    </div>
                    <div className="build-pc-header text-left mb-4">
                        <h2 className="text-2xl font-bold">
                            Build your own dream PC
                        </h2>
                        <hr className="my-2"/>
                        <p className="text-sm font-semibold">
                            Please select the component you want for your dream PC
                        </p>
                    </div>
                    <div className="support-info bg-yellow-300 text-black text-center p-4 mb-4">
                        <p className="mb-2 font-semibold">
                            Not sure how to get the best bang for your buck? Let our professional advisor team help with
                            your dream PC build.
                        </p>
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300">
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
                            <th className="px-6 py-3 w-2/12">Total</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                        </thead>

                        {/* // shitttt */}
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
                            <Link href={cpuLink}>
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
                                                <br/>
                                                <span className="ml-1">hi
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
                            <td className="border text-center px-6 py-3" style={{width: '5%'}}>
                                {selectedProducts.cpu ? (
                                    <span>
                      <FormatPrice price={cpuPrice} type={"discount"}/>
                      <FormatPrice price={cpuPrice - (cpuPrice * cpuDiscount / 100)} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={cpuPrice} type={"normal"}/>
                    </span>)}
                            </td>
                            <td className="border text-center px-6 py-3" style={{width: '5%'}}>
                                <input type="number" min="1" value={quantities.cpu}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('cpu', 1);
                                           } else if (e.target.value > cpuStock) {
                                               handleQuantityChange('cpu', cpuStock);
                                           } else {
                                               handleQuantityChange('cpu', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3">
                                <FormatPrice price={(cpuPrice - cpuPrice * cpuDiscount / 100) * quantities.cpu}
                                             type={"discount"}/>
                            </td>
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
                            <Link target="_blank" href={cpuCoolerLink}>
                              {selectedProducts.cpuCooler}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.cpuCooler ? (
                                <span>
                                {cpuCoolerStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {cpuCoolerStock > 0 && cpuCoolerStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {cpuCoolerStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.cpuCooler ? (
                                    <span>
                      <FormatPrice price={cpuCoolerPrice}/>
                      <FormatPrice price={cpuCoolerPrice - cpuCoolerPrice * cpuCoolerDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={cpuCoolerPrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.cpuCooler}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('cpuCooler', 1);
                                           } else if (e.target.value > cpuCoolerStock) {
                                               handleQuantityChange('cpuCooler', cpuCoolerStock);
                                           } else {
                                               handleQuantityChange('cpuCooler', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice
                                    price={(cpuCoolerPrice - cpuCoolerPrice * cpuCoolerDiscount / 100) * quantities.cpuCooler}
                                    type={"discount"}/>
                            </td>
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
                                                 src={motherBoardImage}
                                                 alt="no image"/>
                                            <p>
                          <span className="ml-1 font-bold">
                            <Link target="_blank" href={motherBoardLink}>
                              {selectedProducts.motherboard}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.motherboard ? (
                                <span>
                                {motherBoardStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {motherBoardStock > 0 && motherBoardStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {motherBoardStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('motherBoard')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select
                                        Motherboard
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.motherboard ? (
                                    <span>
                      <FormatPrice price={motherBoardPrice}/>
                      <FormatPrice price={motherBoardPrice - motherBoardPrice * motherBoardDiscount / 100}
                                   type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={motherBoardPrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.motherboard}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('motherBoard', 1);
                                           } else if (e.target.value > motherBoardStock) {
                                               handleQuantityChange('motherBoard', motherBoardStock);
                                           } else {
                                               handleQuantityChange('motherBoard', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice
                                    price={(motherBoardPrice - motherBoardPrice * motherBoardDiscount / 100) * quantities.motherboard}
                                    type={"discount"}/>
                            </td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.motherboard && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('motherBoard')}
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
                            <Link target="_blank" href={memoryLink}>
                              {selectedProducts.memory}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.memory ? (
                                <span>
                                {memoryStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {memoryStock > 0 && memoryStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {memoryStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.memory ? (
                                    <span>
                      <FormatPrice price={memoryPrice}/>
                      <FormatPrice price={memoryPrice - memoryPrice * memoryDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={memoryPrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.memory}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('memory', 1);
                                           } else if (e.target.value > memoryStock) {
                                               handleQuantityChange('memory', memoryStock);
                                           } else {
                                               handleQuantityChange('memory', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice
                                    price={(memoryPrice - memoryPrice * memoryDiscount / 100) * quantities.memory}
                                    type={"discount"}/>
                            </td>
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
                            <Link target="_blank" href={storageLink}>
                              {selectedProducts.storage}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.storage ? (
                                <span>
                                {storageStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {storageStock > 0 && storageStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {storageStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.storage ? (
                                    <span>
                      <FormatPrice price={storagePrice}/>
                      <FormatPrice price={storagePrice - storagePrice * storageDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={storagePrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.storage}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('storage', 1);
                                           } else if (e.target.value > storageStock) {
                                               handleQuantityChange('storage', storageStock);
                                           } else {
                                               handleQuantityChange('storage', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice
                                    price={(storagePrice - storagePrice * storageDiscount / 100) * quantities.storage}
                                    type={"discount"}/>
                            </td>
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
                            <Link target="_blank" href={gpuLink}>
                              {selectedProducts.gpu}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.gpu ? (
                                <span>
                                {gpuStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {gpuStock > 0 && gpuStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {gpuStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.gpu ? (
                                    <span>
                      <FormatPrice price={gpuPrice}/>
                      <FormatPrice price={gpuPrice - gpuPrice * gpuDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={gpuPrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.gpu}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('gpu', 1);
                                           } else if (e.target.value > gpuStock) {
                                               handleQuantityChange('gpu', gpuStock);
                                           } else {
                                               handleQuantityChange('gpu', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice price={(gpuPrice - gpuPrice * gpuDiscount / 100) * quantities.gpu}
                                             type={"discount"}/>
                            </td>
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
                            <td className="border px-6 py-3 font-bold">PC Case</td>
                            <td className="border px-6 py-3">
                                {selectedProducts.pcCase ? (
                                    <div className="flex items-center">
                                        <div className="product-info">
                                            <img className="product-image"
                                                 src={pcCaseImage}
                                                 alt="no image"/>
                                            <p>
                          <span className="ml-1 font-bold">
                            <Link target="_blank" href={pcCaseLink}>
                              {selectedProducts.pcCase}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.pcCase ? (
                                <span>
                                {pcCaseStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {pcCaseStock > 0 && pcCaseStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {pcCaseStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('pcCase')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select PC
                                        Case
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.pcCase ? (
                                    <span>
                      <FormatPrice price={pcCasePrice}/>
                      <FormatPrice price={pcCasePrice - pcCasePrice * pcCaseDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={pcCasePrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.pcCase}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('pcCase', 1);
                                           } else if (e.target.value > pcCaseStock) {
                                               handleQuantityChange('pcCase', pcCaseStock);
                                           } else {
                                               handleQuantityChange('pcCase', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice
                                    price={(pcCasePrice - pcCasePrice * pcCaseDiscount / 100) * quantities.pcCase}
                                    type={"discount"}/>
                            </td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.pcCase && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('pcCase')}
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
                            <Link target="_blank" href={caseFanLink}>
                              {selectedProducts.caseFan}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.caseFan ? (
                                <span>
                                {caseFanStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {caseFanStock > 0 && caseFanStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {caseFanStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.caseFan ? (
                                    <span>
                      <FormatPrice price={caseFanPrice}/>
                      <FormatPrice price={caseFanPrice - caseFanPrice * caseFanDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={caseFanPrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.caseFan}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('caseFan', 1);
                                           } else if (e.target.value > caseFanStock) {
                                               handleQuantityChange('caseFan', caseFanStock);
                                           } else {
                                               handleQuantityChange('caseFan', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice
                                    price={(caseFanPrice - caseFanPrice * caseFanDiscount / 100) * quantities.caseFan}
                                    type={"discount"}/>
                            </td>
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
                            <Link target="_blank" href={psuLink}>
                              {selectedProducts.psu}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.psu ? (
                                <span>
                                {psuStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {psuStock > 0 && psuStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {psuStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.psu ? (
                                    <span>
                      <FormatPrice price={psuPrice}/>
                      <FormatPrice price={psuPrice - psuPrice * psuDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={psuPrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.psu}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('psu', 1);
                                           } else if (e.target.value > psuStock) {
                                               handleQuantityChange('psu', psuStock);
                                           } else {
                                               handleQuantityChange('psu', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice price={(psuPrice - psuPrice * psuDiscount / 100) * quantities.psu}
                                             type={"discount"}/>
                            </td>
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
                            <Link target="_blank" href={monitorLink}>
                              {selectedProducts.monitor}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.monitor ? (
                                <span>
                                {monitorStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {monitorStock > 0 && monitorStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {monitorStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => openForm('monitor')}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        <FontAwesomeIcon className="text-xl font-semibold" icon={faPlus}/> Select
                                        Monitor
                                    </button>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.monitor ? (
                                    <span>
                      <FormatPrice price={monitorPrice}/>
                      <FormatPrice price={monitorPrice - monitorPrice * monitorDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={monitorPrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.monitor}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('monitor', 1);
                                           } else if (e.target.value > monitorStock) {
                                               handleQuantityChange('monitor', monitorStock);
                                           } else {
                                               handleQuantityChange('monitor', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice
                                    price={(monitorPrice - monitorPrice * monitorDiscount / 100) * quantities.monitor}
                                    type={"discount"}/>
                            </td>
                            <td className="border-b border-r border-t px-3 py-2 w-40">
                                {selectedProducts.monitor && (
                                    <div className="flex justify-center w-full">
                                        <button
                                            onClick={() => handleRemoveProduct('monitor')}
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
                            <Link target="_blank" href={kbLink}>
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
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.keyboard ? (
                                    <span>
                      <FormatPrice price={kbPrice}/>
                      <FormatPrice price={kbPrice - kbPrice * kbDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={kbPrice} type={"normal"}/>
                    </span>
                                )}

                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.keyboard}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('keyboard', 1);
                                           } else if (e.target.value > kbStock) {
                                               handleQuantityChange('keyboard', kbStock);
                                           } else {
                                               handleQuantityChange('keyboard', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice price={(kbPrice - kbPrice * kbDiscount / 100) * quantities.keyboard}
                                             type={"discount"}/>
                            </td>
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
                            <Link target="_blank" href={mouseLink}>
                              {selectedProducts.mouse}
                            </Link>
                          </span>
                                                <br/>
                                                <span className="ml-1 font-semibold">
                            {selectedProducts.mouse ? (
                                <span>
                                {mouseStock === 0 && <span style={{color: 'red'}}>Out of Stock</span>}
                                    {mouseStock > 0 && mouseStock < 10 &&
                                        <span style={{color: 'darkorange'}}>Limited Stock left</span>}
                                    {mouseStock >= 10 && <span style={{color: 'green'}}>Available</span>}
                              </span>
                            ) : null}
                          </span>
                                                <br/>
                                                <span className="ml-1">hi</span>
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
                            <td className="border text-center px-6 py-3">
                                {selectedProducts.mouse ? (
                                    <span>
                      <FormatPrice price={mousePrice}/>
                      <FormatPrice price={mousePrice - mousePrice * mouseDiscount / 100} type={"discount"}/>
                    </span>
                                ) : (
                                    <span>
                      <FormatPrice price={mousePrice} type={"normal"}/>
                    </span>
                                )}
                            </td>
                            <td className="border text-center px-6 py-3">
                                <input type="number" min="1" value={quantities.mouse}
                                       onChange={(e) => {
                                           if (e.target.value < 1) {
                                               handleQuantityChange('mouse', 1);
                                           } else if (e.target.value > mouseStock) {
                                               handleQuantityChange('mouse', mouseStock);
                                           } else {
                                               handleQuantityChange('mouse', e.target.value);
                                           }
                                       }}
                                       className="w-16 px-2 py-1 border rounded"/>
                            </td>
                            <td className="border-b border-t text-center py-3 w-full">
                                <FormatPrice price={(mousePrice - mousePrice * mouseDiscount / 100) * quantities.mouse}
                                             type={"discount"}/>
                            </td>
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 my-2 rounded"
                            onClick={() => addToCart(selectedProducts, quantities, data)}> Add all parts to cart
                        </button>
                    </div>
                </div>

                {isFormVisible && (
                    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
                             onClick={closeForm}></div>
                        <div className="bg-white p-8 rounded shadow-xl max-w-3xl mx-auto z-50">
                            <h2 className="text-lg font-semibold mb-4">Select a component</h2>
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

                {/* CartNotifi */}
                {cartNotifications.map((item, index) => (
                    <div key={index}>
                        <div
                            className="cart-notification"
                            style={{bottom: `${10 + index * 40}px`, display: 'block'}}
                        >
                            <FontAwesomeIcon className="cart-check" icon={faCircleCheck}/>
                            {item.message}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default BuildPcComponents;
