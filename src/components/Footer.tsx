import { menu } from "@/helpers/menu";
import useMisc from "@/hooks/useMisc";
import { FaHouse } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Footer = () => {
	const year: number = new Date().getFullYear();
	const navigate = useNavigate();
	const { selectedGroup, setSelectedGroup } = useMisc();

	return (
		<footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
			{/* <!-- Main container div: holds the entire content of the footer, including four sections (TW Elements, Products, Useful links, and Contact), with responsive styling and appropriate padding/margins. --> */}
			<div className="mx-6 py-10 text-center md:text-left">
				<div className="grid-1 grid gap-8 md:grid-cols-3">
					{/* <!-- TW Elements section --> */}
					<div className="">
						<img
							onClick={() => {
								navigate("/");
							}}
							src="/img/logo.svg"
							alt="logo"
							className="logo dark:logo-white"
						/>
					</div>
					{/* <!-- Products section --> */}
					<div className="[&>button]:nav-btn flex flex-col items-center md:items-start  gap-4">
						<h6 className="font-semibold uppercase text-xl ">Products</h6>
						{menu.map((item, index) => (
							<button
								key={index}
								id={item.value}
								className={`
									${selectedGroup === item.value ? "dark:text-darkGreen text-darkGreen" : ""}
								  font-semibold uppercase`}
								onClick={() => {
									navigate("/");
									window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
									setSelectedGroup(item.value);
								}}
							>
								{item.name}
							</button>
						))}
					</div>
					{/* <!-- Contact section --> */}
					<div>
						<h6 className="mb-4 flex justify-center font-semibold uppercase text-xl  md:justify-start">
							Contact
						</h6>
						<p className="mb-4 flex items-center justify-center md:justify-start">
							<FaHouse className="mr-3" />
							New York, NY 10012, US
						</p>
						<p className="mb-4 flex items-center justify-center md:justify-start">
							<LuMail className="mr-3" />
							info@example.com
						</p>
						<p className="mb-4 flex items-center justify-center md:justify-start">
							<FaPhoneAlt className="mr-3" />+ 01 234 567 88
						</p>
					</div>
				</div>
			</div>

			{/* <!--Copyright section--> */}
			<div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
				<span>© {year} Copyright: </span>
				Shop & Shop | Powered by Shop & Shop
			</div>
		</footer>
	);
};

export default Footer;
