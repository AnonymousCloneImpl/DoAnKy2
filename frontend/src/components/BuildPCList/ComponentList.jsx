import CustomErrorPage from "@/pages/error";
import Link from "next/link";

export default function ComponentList({ data, currentComponent, handleSelectProduct }) {
  if (data === undefined) {
    return <CustomErrorPage />
  }
  return (
    <>
      {data.map((item) => (
        <div key={item.id}
          className="flex p-4 bg-gray-100 rounded-md mb-4 items-center">
          <div className="flex-none w-16 h-16 bg-gray-200 mr-4">
            <img src={item.image} alt=""></img>
          </div>
          <div className="flex-grow">
            <div className="font-semibold">
              <Link target="_blank" href={`/${item.type.replaceAll(" ", "-").toLowerCase()}/${item.name.replaceAll(" ", "-").toLowerCase()}?model=${item.model.toLowerCase()}`}>
                {item.name}
              </Link>
            </div>
            <p className=" font-semibold text-red-600">${item.price}</p>
            <p>{item.detail}</p>
          </div>
          <button
            onClick={() => handleSelectProduct(currentComponent, item, `/${item.type.toLowerCase()}/${item.name.toLowerCase().replaceAll(' ', '-')}`)}
            className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add
          </button>
        </div>
      ))}
    </>
  )
}
