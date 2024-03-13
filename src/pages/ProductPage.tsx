import ProductDetail from "@/components/ProductDetail";
import { ProductType } from "@/context/ProductsProvider";
import useProducts from "@/hooks/useProducts";
import { useParams } from "react-router-dom";

const ProductPage = () => {
	const { sku } = useParams();
	const { products } = useProducts();

	const product: ProductType | undefined = sku
		? products.find((item) => item.sku === sku)
		: undefined;

	return (
		<>
			<div className="h-32"></div>
			<ProductDetail product={product} />
			<div className="h-32"></div>
		</>
	);
};

export default ProductPage;
