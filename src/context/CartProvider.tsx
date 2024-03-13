import { ReactElement, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
	sku: string;
	name: string;
	price: number;
	quantity: number;
	images: string[];
	group: string;
	colors: string[];
	selectedColor: string;
};

type CartStateType = { cart: CartItemType[] };

const REDUCER_ACTION_TYPE = {
	ADD: "ADD",
	REMOVE: "REMOVE",
	QUANTITY: "QUANTITY",
	SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
	type: string;
	payload?: CartItemType;
};

const reducer = (state: CartStateType, action: ReducerAction) => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.ADD: {
			if (!action.payload) {
				throw new Error("Action payload is missing in ADD action");
			}
			const { sku, selectedColor } = action.payload;

			if (
				state.cart.some(
					(item) => item.sku === sku && item.selectedColor === selectedColor
				)
			) {
				const result = {
					...state,
					cart: state.cart.map((item) =>
						item.sku === sku
							? { ...item, quantity: item.quantity + 1, selectedColor }
							: item
					),
				};
				localStorage.setItem("cart", JSON.stringify(result));
				return result;
			} else {
				const result = {
					...state,
					cart: [
						...state.cart,
						{ ...action.payload, quantity: 1, selectedColor },
					],
				};
				localStorage.setItem("cart", JSON.stringify(result));
				return result;
			}
		}

		case REDUCER_ACTION_TYPE.REMOVE: {
			if (!action.payload) {
				throw new Error("Action payload is missing in REMOVE action");
			}
			const { sku, selectedColor } = action.payload;
			const result = {
				...state,
				cart: state.cart.filter(
					(item) => !(item.sku === sku && item.selectedColor === selectedColor)
				),
			};
			localStorage.setItem("cart", JSON.stringify(result));
			return result;
		}

		case REDUCER_ACTION_TYPE.QUANTITY: {
			if (!action.payload) {
				throw new Error("Action payload is missing in QUANTITY action");
			}
			const { sku, quantity, selectedColor } = action.payload;

			if (
				!state.cart.some(
					(item) => item.sku === sku && item.selectedColor === selectedColor
				)
			) {
				throw new Error("Item doesn't exist in cart");
			}
			const result = {
				...state,
				cart: state.cart.map((item) =>
					item.sku === sku && item.selectedColor === selectedColor
						? { ...item, quantity: quantity }
						: item
				),
			};
			localStorage.setItem("cart", JSON.stringify(result));
			return result;
		}

		case REDUCER_ACTION_TYPE.SUBMIT: {
			const result = {
				...state,
				cart: [],
			};
			localStorage.setItem("cart", JSON.stringify(result));
			return result;
		}
		default:
			throw new Error("reducer action type is not identified");
	}
};

export type UseCartContextType = {
	state: CartStateType;
	totalItems: number;
	totalPrice: string;
	addItem: (payload: CartItemType) => void;
	removeItem: (payload: CartItemType) => void;
	changeQuantity: (payload: CartItemType) => void;
	submitCart: () => void;
};

const getDataFromLocalStorage = () => {
	const storedList: string | null = localStorage.getItem("cart");
	if (typeof storedList !== "string") return [];
	const parsedList: CartItemType[] = JSON.parse(storedList).cart;
	return parsedList;
};

const initialState: CartStateType = {
	cart: getDataFromLocalStorage(),
};

const useCartContext = (initState: CartStateType): UseCartContextType => {
	const [state, dispatch] = useReducer(reducer, initState);

	const REDUCER_ACTIONS: ReducerActionType = useMemo(() => {
		return REDUCER_ACTION_TYPE;
	}, []);
	const totalItems: number = state.cart.reduce(
		(total, cartItem) => total + cartItem.quantity,
		0
	);
	const totalPrice: string = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(
		state.cart.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		)
	);

	const cart = state.cart.sort((a, b) => {
		const itemA = Number(a.sku.slice(-4));
		const itemB = Number(b.sku.slice(-4));
		return itemA - itemB;
	});

	const addItem = (payload: CartItemType) => {
		dispatch({ type: REDUCER_ACTIONS.ADD, payload });
	};
	const removeItem = (payload: CartItemType) => {
		dispatch({ type: REDUCER_ACTIONS.REMOVE, payload });
	};
	const changeQuantity = (payload: CartItemType) => {
		dispatch({ type: REDUCER_ACTIONS.QUANTITY, payload });
	};
	const submitCart = () => {
		dispatch({ type: REDUCER_ACTIONS.SUBMIT });
	};

	return {
		state: { cart },
		totalItems,
		totalPrice,
		addItem,
		removeItem,
		changeQuantity,
		submitCart,
	};
};
const initCartState: UseCartContextType = {
	state: { cart: [] },
	totalItems: 0,
	totalPrice: "",
	addItem: () => {},
	removeItem: () => {},
	changeQuantity: () => {},
	submitCart: () => {},
};

const CartContext = createContext<UseCartContextType>(initCartState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
	return (
		<CartContext.Provider value={useCartContext(initialState)}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
