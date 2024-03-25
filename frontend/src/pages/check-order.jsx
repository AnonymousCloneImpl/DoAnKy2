import React, { useState, useEffect } from 'react';

const CheckOrder = () => {
  const [searchPhone, setSearchPhone] = useState('');
  const [data, setData] = useState([]);

  const handleSearch = () => {
    fetch(`${process.env.DOMAIN}/check-order?q=${searchPhone}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <div className="main-search">
        <div className="flex border rounded m-20">
          <input
            type="text"
            className="block w-full px-4 py-2 bg-white border rounded-md focus:outline-none"
            placeholder="Search..."
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
          />
          <button type="submit" className="px-4 text-white bg-red-600 border-l rounded" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>


      <section class="container mx-auto p-6 font-mono">
        <div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th class="px-4 py-3">Name</th>
                  <th class="px-4 py-3">Age</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {Array.isArray(data.data) && data.data.map((item, index) => (
                  <tr key={index} class="text-gray-700">
                    <td class="px-4 py-3 border">
                      <div class="flex items-center text-sm">
                        <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img class="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                          <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p class="font-semibold text-black">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 text-ms font-semibold border">22</td>
                    <td class="px-4 py-3 text-xs border"><span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-gray-100 rounded-sm"> Pending </span>
                      <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> Acceptable </span>
                    </td>
                    <td class="px-4 py-3 text-sm border">6/4/2000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CheckOrder;
