/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";

export default function QrCode({image}) {
  return (
    <div>
      <div className="w-9/12 mx-auto my-10 max-lg:w-11/12">
        <div className="flex m-5">
          <div className="h-20">
            <img className="h-20"
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png">
            </img>
          </div>
          <div className="ml-5">
            <h1 className="font-bold text-lg">Top up your balance directly using paypal payment</h1>
            <p className="font-medium">Dcoin deposit automatically linked to PayPal, completed instantly, 8% fee</p>
          </div>
        </div>

        <div className="h-px bg-gray-200"></div>

        <div className="my-2">
          <ul className="flex justify-around tex-center font-bold">
            <li>Price: 100</li>
            <li>Transaction Fees: 8 (8%)</li>
            <li>Total: 108</li>
          </ul>
        </div>

        <div className="h-px bg-gray-200"></div>

        <div className="flex flex-wrap">
          <div className="h-96 w-1/3 mx-auto max-lg:w-full">
            <img
              className="h-96"
              src={image}
            />
          </div>
          <div className="w-2/3 max-lg:w-full">
            <h1 className="mt-20 mb-5 text-lg font-semibold">Follow the instructions below to pay :</h1>
            <ul>
              <li className="flex font-semibold">Step 1: <p className="ml-2 font-normal">hello</p></li>
              <li className="flex font-semibold">Step 2: <p className="ml-2 font-normal">hello</p></li>
              <li className="flex font-semibold">Step 3: <p className="ml-2 font-normal">hello</p></li>
            </ul>
            <button className="my-5 px-8 py-3 rounded-md bg-blue-500 hover:bg-blue-800 text-white">I have sent money</button>
          </div>
        </div>
      </div>
    </div>
  )
}
