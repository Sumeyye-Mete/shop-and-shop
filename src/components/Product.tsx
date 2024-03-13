import { ReactElement, useState } from "react";
import useCart from "../hooks/useCart";
import { ProductType } from "../context/ProductsProvider";
import { CartItemType } from "../context/CartProvider";
import { BsCartPlusFill } from "react-icons/bs";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CheckedAnimation from "./animations/CheckedAnimation";
import { convertToCurrency, getImageUrl } from "@/helpers/functions";

type PropsType = {
	product: ProductType;
	inCart: boolean;
};

const Product = ({ product, inCart }: PropsType): ReactElement => {
	const { addItem } = useCart();
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [loadingCart, setLoadingCart] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleAddCart = (product: ProductType): void => {
		setLoadingCart(true);
		setTimeout(() => {
			const cartItem: CartItemType = {
				...product,
				quantity: 1,
				selectedColor: product.colors[activeIndex],
			};
			addItem(cartItem);
			setLoadingCart(false);
		}, 1000);
	};

	const content2: JSX.Element = (
		<div
			className={`product-card ${inCart ? "border-4 border-darkGreen" : ""} `}
			onClick={() => {
				navigate(`/item/${product.sku}`);
				window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
			}}
		>
			<img
				src={getImageUrl(product.images[activeIndex])}
				alt={product.name}
				className="product-card-img"
			/>
			<button
				className="add-to-cart-btn "
				disabled={loadingCart}
				onClick={(e) => {
					e.stopPropagation();
					handleAddCart(product);
				}}
			>
				<BsCartPlusFill
					className={`${loadingCart ? "hidden" : "block"} animate-pulse-btn`}
				/>
				<CheckedAnimation className={`${loadingCart ? "block" : "hidden"} `} />
			</button>

			<div className="text-center">
				<p className="mb-3 font-bold">{product.name}</p>
				<p>{convertToCurrency(product.price)}</p>
			</div>
			<div className="buttons">
				{product.images.map((img, index) => (
					<button
						className=" hover:text-green-900 text-xl"
						key={`${img}-${index}`}
						onClick={(e) => {
							e.stopPropagation();
							setActiveIndex(index);
						}}
					>
						{activeIndex === index ? (
							<IoIosRadioButtonOn />
						) : (
							<IoIosRadioButtonOff />
						)}
					</button>
				))}
			</div>
		</div>
	);

	return <>{content2}</>;
};

export default Product;
