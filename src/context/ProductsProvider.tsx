import { ReactElement, createContext, useEffect, useState } from "react";

export type ProductType = {
	sku: string;
	name: string;
	price: number;
	images: string[];
	group: string;
	colors: string[];
};

export type UseProductsContextType = { products: ProductType[] };

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = {
	children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const resp = await fetch("http://localhost:3500/products");
				const data = await resp.json();
				setProducts(data);
			} catch (error) {
				if (error instanceof Error) console.log(error.message);
			}
		};
		fetchData();
	}, []);

	return (
		<ProductsContext.Provider value={{ products }}>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsContext;

/* 
----making json file as local server--- 
in project directory type this=> 
 npx json-server -w data/products.json -p 3500
 npx json-server -w "filepath" -p "port-number"
 */
