import { ReactElement } from "react";
import { CartProvider } from "./CartProvider";
import { ProductsProvider } from "./ProductsProvider";
import { MiscProvider } from "./MiscProvider";

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const StoreProvider = ({ children }: ChildrenType): ReactElement => {
	return (
		<CartProvider>
			<ProductsProvider>
				<MiscProvider>{children}</MiscProvider>
			</ProductsProvider>
		</CartProvider>
	);
};
