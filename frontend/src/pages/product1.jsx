import result from "@/utils/fetchAPI.js";

const url = `${process.env.DOMAIN}/products`;

export default function demoFetchApi() {

    const {data, isLoading, isError} = result(url);

    if (isLoading) {
        return <p className="bg-black">Loading...</p>;
    }

    if (isError) {
        return <p className="text-red-800 text-9xl">Error loading data</p>;
    }

    if (data.size === 0) {
        return <p>Data is Empty</p>
    }

    return (
        <div>
            <ul>
                {data.map((product) => (
                    <li key={product.id} className={styles.li}>
                        <p className="text-6xl bg-blue-900"> {product.name + product.producer} </p>
                    </li>
                ))}
            </ul>
        </div>
    )

}
