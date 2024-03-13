import { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { IoCart, IoCartOutline, IoMenu } from "react-icons/io5";
import SelectMenu from "./SelectMenu";
import { useNavigate } from "react-router-dom";
import { menu, menuOptions } from "@/helpers/menu";
import useMisc from "@/hooks/useMisc";
import SearchBar from "./SearchBar";
import useCart from "@/hooks/useCart";

const Header = () => {
	const accordionRef = useRef<HTMLDivElement>(null);
	const accordionButtonRef = useRef<HTMLButtonElement>(null);
	const { selectedGroup, setSelectedGroup } = useMisc();
	const navigate = useNavigate();
	const { totalItems } = useCart();

	/* collapse accordion when clicked somewhere in page */
	useEffect(() => {
		const handleClickOutsideAccordion = (event: MouseEvent) => {
			if (
				accordionRef.current &&
				!accordionRef.current.contains(event.target as Node) &&
				accordionButtonRef.current?.getAttribute("data-state") === "open"
			) {
				accordionButtonRef.current.click();
			}
		};
		document.addEventListener("mousedown", handleClickOutsideAccordion);
		return () => {
			document.removeEventListener("mousedown", handleClickOutsideAccordion);
		};
	}, []);

	/* CART BUTTON */
	const cartButton: JSX.Element = (
		<div className="relative">
			<button
				className="p-3"
				onClick={() => {
					setSelectedGroup(menuOptions.none);
					navigate("/cart");
					window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
				}}
			>
				{!totalItems ? (
					<IoCartOutline className=" text-2xl" />
				) : (
					<>
						<IoCart className=" text-2xl" />
						<div className="cart-counter">
							<span className="text-sm">{totalItems}</span>
						</div>
					</>
				)}
			</button>
		</div>
	);

	const content = (
		<header
			className="bg-neutral-100 dark:bg-neutral-600 sticky top-0 z-[3]"
			ref={accordionRef}
		>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1" className="border-b-0 sm:mx-6">
					<div className="flex-center justify-between">
						{/* LOGO */}
						<img
							onClick={() => {
								navigate("/");
								setSelectedGroup(menuOptions.all);
							}}
							src="/img/logo.svg"
							alt="logo"
							className="logo dark:logo-white"
						/>
						{/* MENU ITEMS */}
						<nav className="flex-center gap-5">
							<div className="[&>button]:nav-btn flex-center gap-5 hidden md:flex">
								{menu.map((item, index) => (
									<button
										key={index}
										id={item.value}
										className={
											selectedGroup === item.value
												? "dark:text-darkGreen text-darkGreen"
												: ""
										}
										onClick={() => {
											window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
											navigate("/");
											setSelectedGroup(item.value);
										}}
									>
										{item.name}
									</button>
								))}
							</div>
							{/* MENU ITEMS */}
							<div className="hidden xs:block md:hidden w-auto">
								<SelectMenu />
							</div>
						</nav>
						<div className="flex-center">
							{/* SEARCH BUTTON */}
							<AccordionTrigger
								className="[&>svg]:hidden"
								ref={accordionButtonRef}
							>
								<span>
									<FaSearch className="hidden xs:inline nav-btn text-lg" />
									<IoMenu className="xs:hidden nav-btn text-2xl" />
								</span>
							</AccordionTrigger>
							{/* CART BUTTON */}
							{cartButton}
						</div>
					</div>
					<AccordionContent className="flex flex-col items-center">
						{/* SEARCH INPUT */}
						<SearchBar accordionButtonRef={accordionButtonRef} />
						{/* MENU ITEMS */}
						<div className="xs:hidden w-auto">
							<SelectMenu />
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</header>
	);

	return content;
};

export default Header;
