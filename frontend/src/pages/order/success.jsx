import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Success() {
  return (
    <div className="my-10 flex items-center justify-center flex-wrap">
      <div className="w-1/3">
        <img src="https://i.kym-cdn.com/entries/icons/original/000/007/236/show-azusa-the-money.jpg" alt="" />
      </div>
      <p className="text-5xl my-5 w-full text-center">
        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-4xl mr-6" />
        Order Successfully!
      </p>
      <button className="px-5 py-3 mt-5 bg-red-600 rounded-2xl">
        <Link href="/" className="text-2xl h-full w-full text-white text-center">
          Continue shopping
        </Link>
      </button>
    </div>
  )
}
