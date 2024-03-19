import CustomErrorPage from "@/pages/error";

export default function ComponentList({data, currentComponent, handleSelectProduct}) {
    if (data === undefined) {
        return <CustomErrorPage />
    }
    return (
        <>
            {data.map((item) => (
                <div key={item.id}
                     className="flex p-4 bg-gray-100 rounded-md mb-4 items-center">
                    <div className="flex-none w-16 h-16 bg-gray-200 mr-4">
                        <img src={item.image}
                             alt=""></img>
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                        <p>lorem ipsum</p>
                    </div>
                    <button
                        onClick={() => handleSelectProduct(currentComponent, item.name, item.price, item.image, item.stock.quantity)}
                        className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add
                    </button>
                </div>
            ))}
        </>
    )
}