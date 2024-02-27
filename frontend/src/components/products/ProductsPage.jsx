
const ProductsPage = ({ pageData }) => {
    if (!pageData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <p>This should be small slider</p>
            </div>
            <div className="pt-20 w-10/12 h-24">
                <div className="w-full">

                </div>
            </div>
            <h1>List of Products</h1>
        </div>
    );
};


export default ProductsPage;
