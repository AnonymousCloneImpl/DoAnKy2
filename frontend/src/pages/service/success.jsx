import { useEffect, useState } from 'react';
import Head from 'next/head';

const SuccessSchedule = () => {
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('scheduleData')) {
      const data = JSON.parse(sessionStorage.getItem('scheduleData'));
      setScheduleData(data);
    }
  }, []);

  if (!scheduleData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="my-10 mx-auto min-h-screen">
      <Head>
        <title>Success Schedule</title>
      </Head>
      <h1 className="text-3xl font-bold mb-10 text-center">Success Schedule</h1>
      <table className="w-11/12 mx-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 py-2 px-4">Customer Name</th>
            <th className="border border-gray-200 py-2 px-4">Customer Email</th>
            <th className="border border-gray-200 py-2 px-4">Customer Phone</th>
            <th className="border border-gray-200 py-2 px-4">Device Name</th>
            <th className="border border-gray-200 py-2 px-4">Schedule Time</th>
            <th className="border border-gray-200 py-2 px-4">Service Type</th>
            <th className="border border-gray-200 py-2 px-4">Shop Location</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-gray-200 py-2 px-4">{scheduleData.customerName}</td>
            <td className="border border-gray-200 py-2 px-4">{scheduleData.customerEmail}</td>
            <td className="border border-gray-200 py-2 px-4">{scheduleData.customerPhone}</td>
            <td className="border border-gray-200 py-2 px-4">{scheduleData.deviceName}</td>
            <td className="border border-gray-200 py-2 px-4">{scheduleData.scheduleTime}</td>
            <td className="border border-gray-200 py-2 px-4">{scheduleData.serviceType}</td>
            <td className="border border-gray-200 py-2 px-4">{scheduleData.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SuccessSchedule;
