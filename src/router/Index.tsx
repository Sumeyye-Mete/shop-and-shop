import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProductListPage from "@/pages/ProductListPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "../pages/CartPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <ProductListPage /> },
			{ path: "/cart", element: <CartPage /> },
			{ path: "/item/:sku", element: <ProductPage /> },
		],
	},
]);

const RouteProvider = () => {
	return <RouterProvider router={router} />;
};

export default RouteProvider;
