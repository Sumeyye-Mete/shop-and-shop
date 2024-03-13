import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import useProducts from "@/hooks/useProducts";
import { ProductType } from "@/context/ProductsProvider";
import { useNavigate } from "react-router-dom";
import { convertToCurrency, getImageUrl } from "@/helpers/functions";

type PropType = {
	accordionButtonRef: React.RefObject<HTMLButtonElement>;
};
const SearchBar = ({ accordionButtonRef }: PropType) => {
	const [filter, setFilter] = useState<string>("");
	const [results, setResults] = useState<ProductType[]>([]);
	const navigate = useNavigate();

	const { products } = useProducts();

	useEffect(() => {
		const arr: ProductType[] = products.filter((item) => {
			const isNameIncludes =
				item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
			const isGroupIncludes =
				item.group.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
			return isGroupIncludes || isNameIncludes;
		});

		setResults(arr);
	}, [filter, products]);

	return (
		<div className="search-container">
			<Input
				type="email"
				placeholder="Search"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className={` transition-all ${
					!filter ? "" : "input-search-full rounded-b-none border-b-0"
				}`}
			/>
			<div
				className={`${
					!filter ? "min-h-0 max-h-0" : "search-result-full"
				} search-result`}
			>
				{results.length > 0 ? (
					<ul className="py-5">
						<p className="font-semibold mb-3 ml-7">Results</p>
						{results.map((item, index) => {
							return (
								<li
									key={index}
									className={`search-result-item ${
										index % 2 === 0 ? "bg-gray-200 dark:bg-neutral-400" : ""
									}`}
									onClick={() => {
										setFilter("");
										accordionButtonRef.current?.click();
										navigate(`/item/${item.sku}`);
									}}
								>
									<img
										className="w-1/5"
										src={getImageUrl(item.images[0])}
										alt={item.sku}
									/>
									<p className="font-semibold">{item.name}</p>
									<p>{item.group.replace("-", " ")}</p>
									<p>{convertToCurrency(item.price)}</p>
								</li>
							);
						})}
					</ul>
				) : (
					<div className="text-center p-5 text-orange-600">
						No results found
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
