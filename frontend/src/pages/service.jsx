import React, { useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Service = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeTable, setActiveTable] = useState("table1");
  const [isFormVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);

  const openForm = () => setFormVisible(true);
  const closeForm = () => setFormVisible(false);

  // Schedule----------------------------------------------------------------------------------------------
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedShopLocation, setSelectedShopLocation] = useState('');

  const handleServiceOption = (service) => {
    setSelectedService(service);
  };

  const handleShopLocation = (shop) => {
    setSelectedShopLocation(shop);
  };

  if (selectedService === "" || selectedService === undefined || selectedService === null) {
    setSelectedService("Regular Maintenance");
  }

  if (selectedShopLocation === "" || selectedShopLocation === undefined || selectedShopLocation === null) {
    setSelectedShopLocation("Zhōngnánhǎi Shop");
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const scheduleData = {
      customerName,
      customerPhone,
      customerEmail,
      deviceName,
      scheduleTime,
      serviceType: selectedService,
      location: selectedShopLocation
    };

    sessionStorage.setItem('scheduleData', JSON.stringify(scheduleData));

    const scheduleUrl = `${process.env.DOMAIN}/service/schedule-a-repair`;
    const successUrl = `/service/success`;
    fetch(scheduleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    })
      .then(response => {
        if (response.ok) {
          closeForm();
          window.location.href = successUrl;
        } else {
          alert("Failed to schedule !");
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert("An error occurred while scheduling. Please try again later.");
      });
  };

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <h1 className="schedule-header text-3xl font-bold my-10 uppercase">Schedule A Repair Appointment</h1>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <li role="presentation">
              <button
                className={`inline-block py-4 px-4 text-center border-transparent border-b-2 text-center text-xl font-bold pb-5 uppercase
                  ${activeTab === "tab1" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("tab1")}
                id="tab1-tab"
                data-tabs-target="#tab1"
                type="button"
                role="tab"
                aria-controls="tab1"
                aria-selected={activeTab === "tab1" ? "true" : "false"}
              >
                1 To 1 Replacement Warranty
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block py-4 px-4 text-center border-transparent border-b-2 text-center text-xl font-bold pb-5 uppercase
                  ${activeTab === "tab2" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("tab2")}
                id="tab2-tab"
                data-tabs-target="#tab2"
                type="button"
                role="tab"
                aria-controls="tab2"
                aria-selected={activeTab === "tab2" ? "true" : "false"}
              >
                Drop and Water Damage Warranty
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block py-4 px-4 text-center border-transparent border-b-2 text-center text-xl font-bold pb-5 uppercase
                  ${activeTab === "tab3" ? "active-tab" : ""}`}
                onClick={() => setActiveTab("tab3")}
                id="tab3-tab"
                data-tabs-target="#tab3"
                type="button"
                role="tab"
                aria-controls="tab3"
                aria-selected={activeTab === "tab3" ? "true" : "false"}
              >
                Extended Warranty
              </button>
            </li>
          </ul>
        </div>
        <div id="myTabContent">
          <div
            className={`p-4 rounded-lg tab-header dark:bg-gray-800 ${activeTab === "tab1" ? '' : 'hidden'}`}
            id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
            <p className="text-lg font-semibold pb-1 pt-2">I. VIP 1-to-1 Replacement Warranty:</p>
            <p className="ml-10 font-semibold">Applicable products: New/used phones, tablets, new high-end
              headphones, Apple/Samsung smartwatches.</p>
            <p className="ml-10 font-semibold">Coverage period: 6 months / 12 months.</p>
            <p className="ml-10 font-semibold">Warranty benefits and services:</p>
            <ul>
              <li className="ml-20">+ 1-to-1 replacement for all hardware components (including physical
                button faults - Battery faults below 70%).
              </li>
              <li className="ml-20">+ Unlimited device replacements for occurring faults (within the
                warranty period).
              </li>
              <li className="ml-20">+ Equivalent product replacement for warranty-covered items.</li>
              <li className="ml-20">+ Ownership transfer of the product and warranty package within the
                participation period.
              </li>
            </ul>
            <p className="ml-10">Warranty conditions: Product defects due to manufacturing.</p>
            <p className="ml-10">Note: The warranty package is not valid for products that are deformed from
              the original state (dents, dings, bends, cracks...) and products that have been immersed in
              water or have been repaired.</p>
            <p className="ml-10">Processing time: Within 24 hours and a maximum of 14 working days depending
              on the product&apos;s condition.</p>
          </div>

          <div
            className={`p-4 rounded-lg tab-header dark:bg-gray-800 ${activeTab === "tab2" ? '' : 'hidden'}`}
            id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
            <p className="text-lg font-semibold pb-1 pt-2">II. Drop and Water Damage Warranty (BHRV-NN):</p>
            <p className="ml-10 font-semibold">Applicable products: New/used phones, tablets.</p>
            <p className="ml-10 font-semibold">Coverage period: 12 months.</p>
            <p className="ml-10 font-semibold">Warranty benefits and services:</p>
            <ul>
              <li className="ml-20">+ Free VIP 1-to-1 Replacement Warranty (details in the VIP 1-to-1
                package).
              </li>
              <li className="ml-20">+ Unlimited device replacements.</li>
              <li className="ml-20">+ 90% repair cost support for dropped or water-damaged devices.</li>
              <li className="ml-20">+ Equivalent product replacement for irreparable severe damages.</li>
              <li className="ml-20">+ Assistance for trading in damaged products for an upgrade if no
                replacement product is available.
              </li>
              <li className="ml-20">+ Warranty repair fund based on the product&apos;s Listed Price.</li>
            </ul>
            <p className="ml-10">Warranty conditions: Product damaged by external forces causing breakage or
              water immersion, leading to abnormal operation.</p>
            <p className="ml-10">Note: The VIP 1-to-1 warranty package is not valid for products that are
              deformed from the original state (dents, dings, bends, cracks...) and products that have
              been immersed in water or have been repaired.</p>
            <p className="ml-10">Processing time: Repair time from 7 to 14 working days depending on the
              product&apos;s condition.</p>
          </div>

          <div className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab === "tab3" ? '' : 'hidden'}`} id="tab3"
            role="tabpanel" aria-labelledby="tab3-tab">
            <p className="text-lg font-semibold pb-1 pt-2">III. Extended Warranty S24+:</p>
            <p className="ml-10 font-semibold">Applicable products: High-end accessories, Macbook, new
              phones.</p>
            <p className="ml-10 font-semibold">Coverage period: 24 to 36 months, including 12 months
              manufacturer warranty.</p>
            <p className="ml-10 font-semibold">Warranty benefits and services:</p>
            <ul>
              <li className="ml-20">+ 24 to 36 months, including 12 months manufacturer warranty.</li>
              <li className="ml-20">+ After the expiration of the original warranty, CellphoneS continues
                to provide warranty for manufacturing defects, the warranty period follows the selected
                warranty package.
              </li>
              <li className="ml-20">+ Free repair and component replacement.</li>
              <li className="ml-20">+ Equivalent product replacement for irreparable severe damages.</li>
              <li className="ml-20">+ Assistance for trading in damaged products for an upgrade if no
                replacement product is available.
              </li>
            </ul>
            <p className="ml-10">Warranty conditions: After the manufacturer&apos;s warranty period. Product
              with defects due to manufacturing.</p>
            <p className="ml-10">Note: The S24+ warranty package is not valid for products that are deformed
              from the original state (dents, dings, bends, cracks...) and products that have been
              immersed in water or have been repaired.</p>
            <p className="ml-10">Processing time: Repair time from 7 to 14 working days depending on the
              product&apos;s condition. For Macbook, the manufacturer&apos;s warranty processing time may
              extend to 3 to 4 weeks.</p>
            <p className="ml-10">Location for fault check and warranty: At CellphoneS service centers or
              manufacturer&apos;s service centers.</p>
            <p className="ml-10">Not in original condition, unclear tampered date.</p>
          </div>
        </div>

        <div className="my-2">
          <button onClick={openForm}
            className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Schedule now
          </button>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <h1 className="schedule-header text-3xl font-bold my-10 uppercase">Schedule A Repair Appointment</h1>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTableContent" role="tablist">
            <li role="presentation">
              <button
                className={`inline-block py-4 px-4 text-center border-transparent border-b-2 text-center text-xl font-bold pb-5 uppercase
                  ${activeTable === "table1" ? "active-table" : ""}`}
                onClick={() => setActiveTable("table1")}
                id="table1-tab"
                data-tabs-target="#table1"
                type="button"
                role="tab"
                aria-controls="table1"
                aria-selected={activeTable === "table1" ? "true" : "false"}
              >
                Warranty service price list
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block py-4 px-4 text-center border-transparent border-b-2 text-center text-xl font-bold pb-5 uppercase
                  ${activeTable === "table2" ? "active-table" : ""}`}
                onClick={() => setActiveTable("table2")}
                id="table2-tab"
                data-tabs-target="#table2"
                type="button"
                role="tab"
                aria-controls="table2"
                aria-selected={activeTable === "table2" ? "true" : "false"}
              >
                Extended Warranty for Premium Accessories
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block py-4 px-4 text-center border-transparent border-b-2 text-center text-xl font-bold pb-5 uppercase
                  ${activeTable === "table3" ? "active-table" : ""}`}
                onClick={() => setActiveTable("table3")}
                id="table3-tab"
                data-tabs-target="#table3"
                type="button"
                role="tab"
                aria-controls="table3"
                aria-selected={activeTable === "table3" ? "true" : "false"}
              >
                Classification of Extended Warranties
              </button>
            </li>
          </ul>
        </div>
        <div id="myTableContent">
          <div
            className={`p-4 rounded-lg tab-header dark:bg-gray-800 ${activeTable === "table1" ? '' : 'hidden'}`}
            id="table1" role="tabpanel" aria-labelledby="table1-tab">
            <h1 className="text-center text-xl font-bold pb-5 uppercase">Extended Warranty for Premium
              Accessories</h1>
            <table className='service-table'>
              <thead>
                <tr>
                  <th className='service-th'>Price Range</th>
                  <th className='service-th'>1-to-1 VIP Exchange</th>
                  <th className='service-th'>S24 + 12 Months</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='service-td'>1.000.000</td>
                  <td className='service-td'>100.000</td>
                  <td className='service-td'>100.000</td>
                </tr>

                <tr>
                  <td className='service-td'>1.000.001 - 2.000.000</td>
                  <td className='service-td'>200.000</td>
                  <td className='service-td'>100.000</td>
                </tr>

                <tr>
                  <td className='service-td'>2.000.001 - 3.000.000</td>
                  <td className='service-td'>300.000</td>
                  <td className='service-td'>150.000</td>
                </tr>

                <tr>
                  <td className='service-td'>3.000.001 - 4.000.000</td>
                  <td className='service-td'>400.000</td>
                  <td className='service-td'>200.000</td>
                </tr>

                <tr>
                  <td className='service-td'>4.000.001 - 5.000.000</td>
                  <td className='service-td'>400.000</td>
                  <td className='service-td'>300.000</td>
                </tr>

                <tr>
                  <td className='service-td'>5.000.001 - 8.000.000</td>
                  <td className='service-td'>600.000</td>
                  <td className='service-td'>400.000</td>
                </tr>

                <tr>
                  <td className='service-td'>8.000.001 - 10.000.000</td>
                  <td className='service-td'>800.000</td>
                  <td className='service-td'>500.000</td>
                </tr>

                <tr>
                  <td className='service-td'>10.000.001 - 15.000.000</td>
                  <td className='service-td'>1.000.000</td>
                  <td className='service-td'>650.000</td>
                </tr>

                <tr>
                  <td className='service-td'>15.000.001 - 20.000.000</td>
                  <td className='service-td'>1.400.000</td>
                  <td className='service-td'>800.000</td>
                </tr>

                <tr>
                  <td className='service-td'>20.000.001 - 30.000.000</td>
                  <td className='service-td'>2.000.000</td>
                  <td className='service-td'>1.000.000</td>
                </tr>

                <tr>
                  <td className='service-td'>30.000.001 - 40.000.000</td>
                  <td className='service-td'>2.000.000</td>
                  <td className='service-td'>1.200.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className={`p-4 rounded-lg tab-header dark:bg-gray-800 ${activeTable === "table2" ? '' : 'hidden'}`}
            id="table2" role="tabpanel" aria-labelledby="table2-tab">
            <h1 className="text-center text-xl font-bold pb-5 uppercase">Warranty service price list</h1>
            <table className='service-table'>
              <thead>
                <tr>
                  <th className='service-th'>Price Range</th>
                  <th className='service-th'>1-to-1 VIP Exchange</th>
                  <th className='service-th'>S24 + 12 Months</th>
                  <th className='service-th'>S24 + 24 Months</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='service-td'>10.000.000</td>
                  <td className='service-td'>700.000</td>
                  <td className='service-td'>700.000</td>
                  <td className='service-td'>1.400.000</td>
                </tr>

                <tr>
                  <td className='service-td'>10.000.001 - 15.000.000</td>
                  <td className='service-td'>1.500.000</td>
                  <td className='service-td'>1.400.000</td>
                  <td className='service-td'>2.300.000</td>
                </tr>

                <tr>
                  <td className='service-td'>15.000.001 - 20.000.000</td>
                  <td className='service-td'>1.500.000</td>
                  <td className='service-td'>1.400.000</td>
                  <td className='service-td'>2.300.000</td>
                </tr>

                <tr>
                  <td className='service-td'>25.000.001 - 30.000.000</td>
                  <td className='service-td'>2.200.000</td>
                  <td className='service-td'>2.200.000</td>
                  <td className='service-td'>3.400.000</td>
                </tr>

                <tr>
                  <td className='service-td'>30.000.001 - 35.000.000</td>
                  <td className='service-td'>2.600.000</td>
                  <td className='service-td'>2.600.000</td>
                  <td className='service-td'>3.800.000</td>
                </tr>

                <tr>
                  <td className='service-td'>35.000.001 - 40.000.000</td>
                  <td className='service-td'>3.000.000</td>
                  <td className='service-td'>3.000.000</td>
                  <td className='service-td'>4.000.000</td>
                </tr>

                <tr>
                  <td className='service-td'>45.000.001 - 100.000.000</td>
                  <td className='service-td'>4.000.000</td>
                  <td className='service-td'>4.000.000</td>
                  <td className='service-td'>5.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={`p-4 rounded-lg dark:bg-gray-800 ${activeTable === "table3" ? '' : 'hidden'}`}
            id="table3" role="tabpanel" aria-labelledby="table3-tab">
            <h1 className="text-center text-xl font-bold pb-5 uppercase">Classification of Extended
              Warranties Corresponding to Products</h1>
            <table className='service-table'>
              <thead>
                <tr>
                  <th className='service-th'>Product Group</th>
                  <th className='service-th'>BHMR 1-to-1 VIP Exchange</th>
                  <th className='service-th'>BHMR RV-RN</th>
                  <th className='service-th'>BHMR 24+</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='service-td'>Apple</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                </tr>
                <tr>
                  <td className='service-td'>ASUS</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                </tr>
                <tr>
                  <td className='service-td'>Huawei</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                </tr>
                <tr>
                  <td className='service-td'>Others</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                </tr>
                <tr>
                  <td className='service-td'>Nokia</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                </tr>
                <tr>
                  <td className='service-td'>Samsung</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                </tr>
                <tr>
                  <td className='service-td'>Laptop</td>
                  <td className='service-td'>No</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                </tr>
                <tr>
                  <td className='service-td'>Smart Watches</td>
                  <td className='service-td'>No</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>No</td>
                </tr>
                <tr>
                  <td className='service-td'>Used Phones</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>No</td>
                </tr>
                <tr>
                  <td className='service-td'>Premium Accessories</td>
                  <td className='service-td'>No</td>
                  <td className='service-td'>Yes</td>
                  <td className='service-td'>No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-2 mb-20">
          <button onClick={openForm}
            className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-3 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Schedule now
          </button>
        </div>
      </div>

      {/* form */}
      {isFormVisible && (
        <div>
          <div className="overlay" onClick={closeForm}></div>
          <div className="service-popup" ref={formRef}>
            <form action="#" onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <span className="close-form-btn" onClick={closeForm}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </span>
                <img className='order-logo' src='/favico.png'></img>

                <h2 className="text-lg font-bold mb-2">Customer Information</h2>
                <label htmlFor="fullname" className="block text-sm font-semibold text-black-900">Full
                  Name:</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder='Example: Ngọc Trinh...'
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-gray-100 mt-1 p-2 w-full border rounded-md" required
                />

                <div className="flex justify-between mt-4">
                  <div className="w-1/2 mr-2">
                    <label htmlFor="email"
                      className="block text-sm font-semibold text-black-900">Email:</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder='Example@gmail.com'
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="bg-gray-100 mt-1 p-2 w-full border rounded-md" required />
                  </div>

                  <div className="w-1/2 ml-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-black-900">Phone
                      Number:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="bg-gray-100 mt-1 p-2 w-full border rounded-md" required />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2">Maintenance Service</h2>
                <div className="flex justify-between">
                  <div className="w-1/2 mr-2">
                    <label htmlFor="make" className="block text-sm font-semibold text-black-900">Device
                      Name:</label>
                    <input
                      type="text"
                      id="make"
                      name="make"
                      onChange={(e) => setDeviceName(e.target.value)}
                      className="bg-gray-100 mt-1 p-2 w-full border rounded-md" required />
                  </div>

                  <div className="w-1/2 ml-2">
                    <label htmlFor="service" className="block text-sm font-semibold text-black-900">Select
                      Service:</label>
                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      onChange={(e) => handleServiceOption(e.target.value)}
                      className="bg-gray-100 mt-1 p-2 w-full border rounded-md">
                      <option value="Regular Maintenance">Regular Maintenance</option>
                      <option value="Component Upgrade">Component Upgrade</option>
                      <option value="Repair">Repair</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <div className="w-1/2 mr-2">
                    <label htmlFor="time"
                      className="block text-sm font-semibold text-black-900">Time:</label>
                    <input
                      type="text"
                      id="time" name="time"
                      placeholder='8:00 AM - 7:00 PM'
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="bg-gray-100 mt-1 p-2 w-full border rounded-md" required />
                  </div>

                  <div className="w-1/2 ml-2">
                    <label htmlFor="location"
                      className="block text-sm font-semibold text-black-900">Location:</label>
                    <select
                      id="location"
                      name="location"
                      defaultValue=""
                      onChange={(e) => handleShopLocation(e.target.value)}
                      className="bg-gray-100 mt-1 p-2 w-full border rounded-md">
                      <option value="Zhōngnánhǎi Shop">Zhōngnánhǎi Shop</option>
                      <option value="Kremlyovskiy Shop">Kremlyovskiy Shop</option>
                      <option value="White House Shop">White House Shop</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="submit-container text-center">
                <button
                  type="submit"
                  className="mb-1 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700" >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Service;
