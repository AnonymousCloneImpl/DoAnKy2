import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Success() {
    return (
        <div className="h-60 flex items-center justify-center flex-wrap">
            <p className="text-5xl w-full text-center">
                <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 text-4xl mr-6" />
                Payment Successfully!
            </p>
            <button className="h-20 w-60 bg-red-600 rounded-2xl">
                <Link href="/public" className="text-2xl h-full w-full text-white text-center">
                    Continue shopping
                </Link>
            </button>
        </div>
    )
}