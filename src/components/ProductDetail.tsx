import { CartItemType } from "@/context/CartProvider";
import { ProductType } from "@/context/ProductsProvider";
import { convertToCurrency, getImageUrl } from "@/helpers/functions";
import useCart from "@/hooks/useCart";
import { useState } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
import Spinner from "./animations/Spinner";

type PropsType = {
	product: ProductType | undefined;
};

const ProductDetail = ({ product }: PropsType) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [loadingCart, setLoadingCart] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);
	const { addItem, changeQuantity } = useCart();

	const handleAddCart = (product: ProductType): void => {
		setLoadingCart(true);
		setTimeout(() => {
			const cartItem: CartItemType = {
				...product,
				quantity,
				selectedColor: product.colors[activeIndex],
			};
			addItem(cartItem);
			changeQuantity(cartItem);
			setLoadingCart(false);
		}, 1000);
	};

	if (!product) {
		return <div>404</div>;
	}
	return (
		<div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
			<div className="grid grid-cols-2 gap-5">
				<div className="col-span-2 overflow-hidden rounded-lg">
					<img
						src={getImageUrl(product.images[activeIndex])}
						alt={product.name}
						className="product-detail-image hover:scale-110 transition-transform"
					/>
				</div>
				{product.images.map((img, index) => {
					if (activeIndex === index) return;
					return (
						<div key={index} className="col-span-1">
							<img
								src={getImageUrl(img)}
								alt={product.name}
								className="product-detail-image"
								onClick={() => {
									setActiveIndex(index);
								}}
							/>
						</div>
					);
				})}
			</div>
			<div className="flex flex-col items-start gap-5">
				<p className="capitalize text-slate-400">
					{product.group.replace("-", " ")}
				</p>
				<h2 className="text-3xl font-medium">{product.name}</h2>
				<h3 className="text-3xl font-medium">
					{convertToCurrency(product.price)}
				</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint eos
					ratione ducimus dicta distinctio nostrum earum ipsa voluptates modi,
					adipisci quaerat, sequi cumque ex! At quibusdam vel hic blanditiis
					officia!
				</p>
				<div className="bg-gray-200 dark:bg-neutral-500 rounded-lg py-2 px-4 w-full">
					<p className="text-white mb-3">Colors</p>
					{product.colors.map((color, index) => (
						<button
							className={`rounded-full text-xl ${
								activeIndex === index
									? "border-2 border-white dark:border-white"
									: ""
							} ]`}
							key={index}
							onClick={() => setActiveIndex(index)}
						>
							<IoIosRadioButtonOn style={{ color: color }} />
						</button>
					))}
				</div>
				<div className="[&>button]:qty-btn border-2">
					<button
						onClick={() => {
							if (quantity === 1) return;
							setQuantity((prev) => prev - 1);
						}}
					>
						-
					</button>
					<button disabled className="border-r-2 border-l-2">
						{quantity}
					</button>
					<button
						onClick={() => {
							setQuantity((prev) => prev + 1);
						}}
					>
						+
					</button>
				</div>

				<button
					className="add-cart-btn"
					disabled={loadingCart}
					onClick={() => {
						handleAddCart(product);
					}}
				>
					{loadingCart && <Spinner />}
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductDetail;
