import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className=" md:container grow">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default App;
