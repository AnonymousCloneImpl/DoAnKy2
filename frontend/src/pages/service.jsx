import React from "react";

const service = () => {
  return (
    <div>
      <div class="w-11/12 mx-auto">
        <div class="border-b border-gray-200 dark:border-gray-700 mb-4">
          <ul class="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <li class="mr-2" role="presentation">
              <button class="inline-block text-gray-900 uppercase rounded-t-lg py-4 px-4 text-xl font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                1 To 1 Replacement Warranty
              </button>
            </li>
            <li class="mr-2" role="presentation">
              <button class="inline-block text-gray-900 uppercase rounded-t-lg py-4 px-4 text-xl font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">
                Drop and Water Damage Warranty
              </button>
            </li>
            <li class="mr-2" role="presentation">
              <button class="inline-block text-gray-900 uppercase rounded-t-lg py-4 px-4 text-xl font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">
                Extended Warranty
              </button>
            </li>
          </ul>
        </div>
        <div id="myTabContent">
          <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <p className="text-lg font-semibold pb-1 pt-2">I. VIP 1-to-1 Replacement Warranty:</p>
            <p className="ml-10 font-semibold">Applicable products: New/used phones, tablets, new high-end headphones, Apple/Samsung smartwatches.</p>
            <p className="ml-10 font-semibold">Coverage period: 6 months / 12 months.</p>
            <p className="ml-10 font-semibold">Warranty benefits and services:</p>
            <ul>
              <li className="ml-20">+ 1-to-1 replacement for all hardware components (including physical button faults - Battery faults below 70%).</li>
              <li className="ml-20">+ Unlimited device replacements for occurring faults (within the warranty period).</li>
              <li className="ml-20">+ Equivalent product replacement for warranty-covered items.</li>
              <li className="ml-20">+ Ownership transfer of the product and warranty package within the participation period.</li>
            </ul>
            <p className="ml-10">Warranty conditions: Product defects due to manufacturing.</p>
            <p className="ml-10">Note: The warranty package is not valid for products that are deformed from the original state (dents, dings, bends, cracks...) and products that have been immersed in water or have been repaired.</p>
            <p className="ml-10">Processing time: Within 24 hours and a maximum of 14 working days depending on the product&apos;s condition.</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
            <p className="text-lg font-semibold pb-1 pt-2">II. Drop and Water Damage Warranty (BHRV-NN):</p>
            <p className="ml-10 font-semibold">Applicable products: New/used phones, tablets.</p>
            <p className="ml-10 font-semibold">Coverage period: 12 months.</p>
            <p className="ml-10 font-semibold">Warranty benefits and services:</p>
            <ul>
              <li className="ml-20">+ Free VIP 1-to-1 Replacement Warranty (details in the VIP 1-to-1 package).</li>
              <li className="ml-20">+ Unlimited device replacements.</li>
              <li className="ml-20">+ 90% repair cost support for dropped or water-damaged devices.</li>
              <li className="ml-20">+ Equivalent product replacement for irreparable severe damages.</li>
              <li className="ml-20">+ Assistance for trading in damaged products for an upgrade if no replacement product is available.</li>
              <li className="ml-20">+ Warranty repair fund based on the product&apos;s Listed Price.</li>
            </ul>
            <p className="ml-10">Warranty conditions: Product damaged by external forces causing breakage or water immersion, leading to abnormal operation.</p>
            <p className="ml-10">Note: The VIP 1-to-1 warranty package is not valid for products that are deformed from the original state (dents, dings, bends, cracks...) and products that have been immersed in water or have been repaired.</p>
            <p className="ml-10">Processing time: Repair time from 7 to 14 working days depending on the product&apos;s condition.</p>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg dark:bg-gray-800 hidden" id="settings" role="tabpanel" aria-labelledby="settings-tab">
            <p className="text-lg font-semibold pb-1 pt-2">III. Extended Warranty S24+:</p>
            <p className="ml-10 font-semibold">Applicable products: High-end accessories, Macbook, new phones.</p>
            <p className="ml-10 font-semibold">Coverage period: 24 to 36 months, including 12 months manufacturer warranty.</p>
            <p className="ml-10 font-semibold">Warranty benefits and services:</p>
            <ul>
              <li className="ml-20">+ 24 to 36 months, including 12 months manufacturer warranty.</li>
              <li className="ml-20">+ After the expiration of the original warranty, CellphoneS continues to provide warranty for manufacturing defects, the warranty period follows the selected warranty package.</li>
              <li className="ml-20">+ Free repair and component replacement.</li>
              <li className="ml-20">+ Equivalent product replacement for irreparable severe damages.</li>
              <li className="ml-20">+ Assistance for trading in damaged products for an upgrade if no replacement product is available.</li>
            </ul>
            <p className="ml-10">Warranty conditions: After the manufacturer&apos;s warranty period. Product with defects due to manufacturing.</p>
            <p className="ml-10">Note: The S24+ warranty package is not valid for products that are deformed from the original state (dents, dings, bends, cracks...) and products that have been immersed in water or have been repaired.</p>
            <p className="ml-10">Processing time: Repair time from 7 to 14 working days depending on the product&apos;s condition. For Macbook, the manufacturer&apos;s warranty processing time may extend to 3 to 4 weeks.</p>
            <p className="ml-10">Location for fault check and warranty: At CellphoneS service centers or manufacturer&apos;s service centers.</p>
            <p className="ml-10">Not in original condition, unclear tampered date.</p>
          </div>
        </div>
      </div>

      <div className="ml-20">
        <button className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Schedule now
        </button>
      </div>

      <div className="abc">
        <h1 className="text-center text-2xl font-bold pb-5 uppercase">Warranty service price list</h1>
        <table>
          <thead>
            <tr>
              <th>Khoảng Giá</th>
              <th>1 Đổi 1 Vip</th>
              <th>S24 + 12 Tháng</th>
              <th>S24 + 24 Tháng</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>10.000.000</td>
              <td>700.000</td>
              <td>700.000</td>
              <td>1.400.000</td>
            </tr>

            <tr>
              <td>10.000.001 - 15.000.000</td>
              <td>1.500.000</td>
              <td>1.400.000</td>
              <td>2.300.000</td>
            </tr>

            <tr>
              <td>15.000.001 - 20.000.000</td>
              <td>1.500.000</td>
              <td>1.400.000</td>
              <td>2.300.000</td>
            </tr>

            <tr>
              <td>25.000.001 - 30.000.000</td>
              <td>2.200.000</td>
              <td>2.200.000</td>
              <td>3.400.000</td>
            </tr>

            <tr>
              <td>30.000.001 - 35.000.000</td>
              <td>2.600.000</td>
              <td>2.600.000</td>
              <td>3.800.000</td>
            </tr>

            <tr>
              <td>35.000.001 - 40.000.000</td>
              <td>3.000.000</td>
              <td>3.000.000</td>
              <td>4.000.000</td>
            </tr>

            <tr>
              <td>45.000.001 - 100.000.000</td>
              <td>4.000.000</td>
              <td>4.000.000</td>
              <td>5.000.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="abc">
        <h1 className="text-center text-2xl font-bold pb-5">Bảo Hành Mở Rộng Dành Cho Phụ Kiện Cao Cấp</h1>
        <table>
          <thead>
            <tr>
              <th>Khoảng Giá</th>
              <th>1 Đổi 1 Vip</th>
              <th>S24 + 12 Tháng</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1.000.000</td>
              <td>100.000</td>
              <td>100.000</td>
            </tr>

            <tr>
              <td>1.000.001 - 2.000.000</td>
              <td>200.000</td>
              <td>100.000</td>
            </tr>

            <tr>
              <td>2.000.001 - 3.000.000</td>
              <td>300.000</td>
              <td>150.000</td>
            </tr>

            <tr>
              <td>3.000.001 - 4.000.000</td>
              <td>400.000</td>
              <td>200.000</td>
            </tr>

            <tr>
              <td>4.000.001 - 5.000.000</td>
              <td>400.000</td>
              <td>300.000</td>
            </tr>

            <tr>
              <td>5.000.001 - 8.000.000</td>
              <td>600.000</td>
              <td>400.000</td>
            </tr>

            <tr>
              <td>8.000.001 - 10.000.000</td>
              <td>800.000</td>
              <td>500.000</td>
            </tr>

            <tr>
              <td>10.000.001 - 15.000.000</td>
              <td>1.000.000</td>
              <td>650.000</td>
            </tr>

            <tr>
              <td>15.000.001 - 20.000.000</td>
              <td>1.400.000</td>
              <td>800.000</td>
            </tr>

            <tr>
              <td>20.000.001 - 30.000.000</td>
              <td>2.000.000</td>
              <td>1.000.000</td>
            </tr>

            <tr>
              <td>30.000.001 - 40.000.000</td>
              <td>2.000.000</td>
              <td>1.200.000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="abc">
        <h1 className="text-center text-2xl font-bold pb-5">Phân Loại Bảo Hành Mở Rộng Tương Ứng Với Các Sản Phẩm</h1>
        <table>
          <thead>
            <tr>
              <th>Nhóm Hàng</th>
              <th>BHMR 1 Đổi 1 Vip</th>
              <th>BHMR RV-RN</th>
              <th>BHMR 24+</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Apple</td>
              <td>Có</td>
              <td>Có</td>
              <td>Có</td>
            </tr>

            <tr>
              <td>ASUS</td>
              <td>Có</td>
              <td>Có</td>
              <td>Có</td>
            </tr>

            <tr>
              <td>Huawei</td>
              <td>Có</td>
              <td>Có</td>
              <td>Có</td>
            </tr>

            <tr>
              <td>Khác</td>
              <td>Có</td>
              <td>Có</td>
              <td>Có</td>
            </tr>

            <tr>
              <td>Nokia</td>
              <td>Có</td>
              <td>Có</td>
              <td>Có</td>
            </tr>

            <tr>
              <td>SamSung</td>
              <td>Có</td>
              <td>Có</td>
              <td>Có</td>
            </tr>

            <tr>
              <td>Laptop</td>
              <td>Không</td>
              <td>Có</td>
              <td>Có</td>
            </tr>

            <tr>
              <td>Đồng Hồ Thông Minh</td>
              <td>Không</td>
              <td>Có</td>
              <td>Không</td>
            </tr>

            <tr>
              <td>Điện Thoại Cũ</td>
              <td>Có</td>
              <td>Có</td>
              <td>Không</td>
            </tr>

            <tr>
              <td>Phụ Kiện Cao Cấp</td>
              <td>Không</td>
              <td>Có</td>
              <td>Không</td>
            </tr>
          </tbody>
        </table>


        <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-4">Schedule A Repair Appointment</h1>

          {/* form */}
          <form action="#" method="post">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Customer Information</h2>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">Full Name:</label>
              <input type="text" id="fullname" name="fullname" className="mt-1 p-2 w-full border rounded-md" required />
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mt-4">Email:</label>
              <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" required />
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mt-4">Phone Number:</label>
              <input type="text" id="phone" name="phone" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Equipment Information</h3>
              <label htmlFor="make" className="block text-sm font-medium text-gray-600">Device Name:</label>
              <input type="text" id="make" name="make" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Maintenance Service</h2>
              <label htmlFor="service" className="block text-sm font-medium text-gray-600">Select Service:</label>
              <select id="service" name="service" className="mt-1 p-2 w-full border rounded-md">
                <option value="Regular Maintenance">Regular Maintenance</option>
                <option value="Component Upgrade">Component Upgrade</option>
                <option value="Repair">Repair</option>
              </select>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Location & Time</h3>
              <label htmlFor="location" className="block text-sm font-medium text-gray-600">Location:</label>
              <input type="text" id="location" name="location" className="mt-1 p-2 w-full border rounded-md" required />
              <label htmlFor="time" className="block text-sm font-medium text-gray-600 mt-4">Time:</label>
              <input type="text" id="time" name="time" className="mt-1 p-2 w-full border rounded-md" required />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Notes</h2>
              <textarea id="note" name="note" rows="4" cols="50" placeholder="Notes about maintenance request" className="mt-1 p-2 w-full border rounded-md"></textarea>
            </div>

            <div className="submit-container text-center">
              <input type="submit" value="Submit" className="bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700" />
            </div>
          </form>
        </div>
      </div>
      <script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></script>
    </div >
  )
}

export default service;
