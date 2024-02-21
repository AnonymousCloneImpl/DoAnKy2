"use client"
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const searchRef = useRef(null);

    const handleSearch = async () => {
        setError(null); // Xóa lỗi trước khi thực hiện tìm kiếm mới

        try {
            if (!searchTerm.trim()) {
                // Nếu không có giá trị hoặc chỉ chứa khoảng trắng, không thực hiện tìm kiếm
                setSearchResults([]);
                return;
            }

            const response = await fetch(`${process.env.DOMAIN}/products/search?name=${searchTerm}`);

            if (!response.ok) {
                throw new Error("Lỗi khi gọi API");
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            setError("Lỗi khi tìm kiếm sản phẩm");
            setSearchResults([]);
        }
    };

    const handleClickClose = () => {
        setSearchResults([]);
        setError(null);
    };

    useEffect(() => {
        document.body.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleKeyDown = async (e) => {
        if (e.keyCode === 13) {
            console.log(e.target.value);
            setSearchTerm(e.target.value);
            let data = await handleSearch();
            if (data.length !== 0) {
                setSearchResults(data);
            } else {
                setError("Không tìm thấy sản phẩm phù hợp");
                setSearchResults([]);
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                // Người dùng bấm ra khỏi component, tắt kết quả tìm kiếm
                setSearchResults([]);
                setError(null);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={searchRef}>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={async (e) => {
                        setSearchTerm(e.target.value);
                        let data = await handleSearch();
                        if (data.length !== 0) {
                            setSearchResults(data);
                        } else {
                            setError("Không tìm thấy sản phẩm phù hợp");
                            setSearchResults([]);
                        }
                    }}
                    id="default-search"
                    className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                    placeholder="Search..."
                    required=""
                />
            </div>
            <div
                className="absolute bg-slate-50 left-0 right-0 top-full rounded shadow-md max-h-[500px] overflow-y-scroll">
                {(searchResults.length > 0 || error) && (
                    <div
                        className="flex justify-between items-center my-5 pb-5 border-b-2 text-emerald-500 px-2 lg:px-5 ">
                        <span className="cursor-pointer ">Top gợi ý</span>
                        <button
                            className="flex justify-between items-center group hover:text-emerald-300"
                            onClick={handleClickClose}
                        >
                            Đóng{" "}
                            <svg
                                className="fill-emerald-500 group-hover:fill-emerald-300 text-xl ml-2 "
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 384 512"
                            >
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                            </svg>
                        </button>
                    </div>
                )}
                {error && <p className="px-1 lg:px-5 ">{error}</p>}
                <ul className="">
                    {searchResults.map((product) => (
                        <li className="group  text-sm px-1 lg:px-5   hover:bg-slate-200" key={product.product_id}>
                            <Link href={`/products/${product.product_id}`}>
                                <div className="flex justify-between items-center ">
                                    <div className="flex justify-between items-center">
                                        <img
                                            className="max-w-[50px] rounded-full bg-white aspect-square object-scale-down"
                                            src={product.thumb_image_url}
                                            alt=""
                                        />
                                        <span className="ml-3 group-hover:text-blue-500 ">{product.name}</span>
                                    </div>
                                    <svg
                                        className="group-hover:fill-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="1em"
                                        viewBox="0 0 320 512"
                                    >
                                        <path
                                            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                                    </svg>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
