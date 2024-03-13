import useCart from "../hooks/useCart";
import useProducts from "../hooks/useProducts";
import Product from "../components/Product";
import PageHeader from "../components/PageHeader";
import { useLocation } from "react-router-dom";
import useMisc from "@/hooks/useMisc";
import { menuOptions } from "@/helpers/menu";

const ProductListPage = () => {
	const { products } = useProducts();
	const { state } = useCart();
	const { selectedGroup } = useMisc();
	const title = useLocation().pathname;

	let pageContent: JSX.Element[] | JSX.Element = <p>Loading...</p>;

	if (products?.length) {
		const filteredProducts =
			selectedGroup === menuOptions.all
				? products
				: products.filter((item) => item.group === selectedGroup);

		pageContent = filteredProducts.map((product, index) => {
			const inCart: boolean = state.cart.some(
				(item) => item.sku === product.sku
			);
			return <Product product={product} key={index} inCart={inCart} />;
		});
	}

	return (
		<div>
			<PageHeader title={selectedGroup} />
			<div className="flex flex-wrap justify-center gap-4 p-5">
				{pageContent}
			</div>
			<div className="h-32"></div>
		</div>
	);
};

export default ProductListPage;
