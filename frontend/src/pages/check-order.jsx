import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormatPrice from "@/components/FormatPrice";

const CheckOrder = () => {
  const [searchCode, setSearchCode] = useState('');

  const handleSearch = () => {
    fetch(`${process.env.DOMAIN}/check-order?name=${searchCode}`)
      .then(response => response.json())
      .then(data => {
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
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
          <button className="px-4 text-white bg-red-600 border-l rounded" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOrder;