import { useState } from "react";
import useCart from "../hooks/useCart";
import CartLineItem from "../components/CartLineItem";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import useMisc from "@/hooks/useMisc";
import { menuOptions } from "@/helpers/menu";
import Spinner from "@/components/animations/Spinner";

const CartPage = () => {
	const { state, totalItems, totalPrice, submitCart } = useCart();
	const [confirm, setConfirm] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const { setSelectedGroup } = useMisc();
	const navigate = useNavigate();

	const onSubmitOrder = () => {
		setLoading(true);
		setTimeout(() => {
			submitCart();
			setConfirm(true);
			setLoading(false);
		}, 1000);
	};

	const navigateToHome = (): void => {
		setSelectedGroup(menuOptions.all);
		navigate("/");
	};

	const emptyBasket = (
		<div className="cart-info-container">
			<img src="/img/shopping-cart.gif" alt="cart-gif" />
			<h2 className="cart-info-text">
				No items yet? Continue shopping to explore more.
			</h2>
			<button onClick={navigateToHome} className="custom-btn">
				Explore Items
			</button>
		</div>
	);
	const orderResultInfo = (
		<div className="cart-info-container">
			<h2 className="cart-info-text">Thank you for your order</h2>
			<button
				onClick={() => {
					setConfirm(false);
					navigateToHome();
				}}
				className="custom-btn"
			>
				Continue Shopping
			</button>
		</div>
	);

	const pageContent = confirm ? (
		<h2>Thank you for your order</h2>
	) : (
		<div className="cart-page-content">
			<ul className="cart-list ">
				{state.cart.map((item, index) => (
					<CartLineItem item={item} key={index} />
				))}
			</ul>
			<div className="cart-submit">
				<p className="text-amber-600 uppercase">Total Items ({totalItems})</p>
				<p className="text-3xl text-darkGreen">{totalPrice}</p>
				<button
					disabled={!totalItems || loading}
					onClick={onSubmitOrder}
					className="submit-btn"
				>
					{loading && <Spinner />}
					Submit
				</button>
			</div>
		</div>
	);

	return (
		<main>
			{confirm ? (
				orderResultInfo
			) : !totalItems ? (
				emptyBasket
			) : (
				<>
					<PageHeader title="cart" /> {pageContent}{" "}
				</>
			)}
		</main>
	);
};

export default CartPage;
