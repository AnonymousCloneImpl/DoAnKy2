import {useRouter} from "next/router";
import ProductsPageByType from "@/components/products/ProductsPageByType";

const productType = [
    "laptop",
    "cpu",
    "cpuCooler",
    "motherboard",
    "memory",
    "storage",
    "gpu",
    "pcCase",
    "caseFan",
    "psu",
    "monitor",
    "keyboard",
    "mouse",
];

const ProductsPageRoute = () => {
    const router = useRouter();

    let type = router.query.type?.replace("-", "") || null;
    if (type !== null) {
        for (let i = 0; i < productType.length; i++) {
            if (productType[i].toLowerCase() === type.toLowerCase()) {
                return  (
                    <ProductsPageByType type={type} />
                )
            }
        }
    }

};

export default ProductsPageRoute;
