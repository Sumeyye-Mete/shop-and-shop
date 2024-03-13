import { ChangeEvent, ReactElement } from "react";
import { CartItemType } from "../context/CartProvider";
import useCart from "../hooks/useCart";
import { convertToCurrency, getImageUrl } from "@/helpers/functions";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";

type PropType = {
	item: CartItemType;
};

const CartLineItem = ({ item }: PropType) => {
	const { changeQuantity, removeItem, addItem } = useCart();
	const navigate = useNavigate();
	console.log(item);

	const lineTotal: number = item.quantity * item.price;

	const highestQty: number = 20 > item.quantity ? 20 : item.quantity;

	const optionValues: number[] = [...Array(highestQty).keys()].map(
		(i) => i + 1
	);

	const selectedImage = item.colors.indexOf(item.selectedColor);

	const options: ReactElement[] = optionValues.map((item) => {
		return (
			<option key={`opt${item}`} value={item}>
				{item}
			</option>
		);
	});

	const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>): void => {
		changeQuantity({ ...item, quantity: Number(e.target.value) });
	};

	const content = (
		<li className="cart-line-item">
			<img
				src={getImageUrl(item.images[selectedImage])}
				alt={item.name}
				onClick={() => navigate(`/item/${item.sku}`)}
				className="w-1/5 cursor-pointer hover:scale-110 transition-transform"
			/>
			<div className="cart-line-item-details">
				<div>{item.name}</div>
				<div>{convertToCurrency(item.price)}</div>
				<label htmlFor={`itemQty-${item.sku}`} className=" hidden"></label>
				<div className="flex">
					{item.colors.map((color, index) => (
						<button
							className={`rounded-full text-xl ${
								item.selectedColor === color
									? "border-2 border-white dark:border-white"
									: ""
							} ]`}
							key={index}
							onClick={() => {
								removeItem(item);
								addItem({ ...item, selectedColor: color });
							}}
						>
							<IoIosRadioButtonOn style={{ color: color }} />
						</button>
					))}
				</div>
				<div>
					<select
						name="itemQty"
						id={`itemQty-${item.sku}`}
						value={item.quantity}
						aria-label="item quantity"
						onChange={onChangeQuantity}
						className="quantity"
					>
						{options}
					</select>
				</div>
				<div
					aria-label="total price of item"
					className="font-bold text-lg text-amber-600"
				>
					{convertToCurrency(lineTotal)}
				</div>
			</div>
			<button
				aria-label="remove item from cart"
				className="nav-btn"
				onClick={() => removeItem(item)}
			>
				<FaTimes className="text-3xl text-rose-800" />
			</button>
		</li>
	);

	return content;
};

export default CartLineItem;
