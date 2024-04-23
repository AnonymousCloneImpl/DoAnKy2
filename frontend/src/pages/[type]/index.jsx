import { useRouter } from "next/router";
import ProductsPageByType from "@/components/products/ProductsPageByType";

const productType = [
  "laptop",
  "cpu",
  "cpu cooler",
  "motherboard",
  "power supply unit",
  "memory",
  "storage",
  "gpu",
  "pc case",
  "case fan",
  "psu",
  "monitor",
  "keyboard",
  "mouse",
  "headphone"
];

const ProductsPageRoute = () => {
  const router = useRouter();

  const type = router.query.type?.replaceAll("-", " ") || null;
  if (type !== null) {
    for (let i = 0; i < productType.length; i++) {
      if (productType[i].toLowerCase() === type.toLowerCase()) {
        return (
          <ProductsPageByType type={type} />
        )
      }
    }
  }

};

export default ProductsPageRoute;
