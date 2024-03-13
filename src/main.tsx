import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteProvider from "./router/Index";
import { StoreProvider } from "./context/StoreProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<StoreProvider>
			<RouteProvider />
		</StoreProvider>
	</React.StrictMode>
);
