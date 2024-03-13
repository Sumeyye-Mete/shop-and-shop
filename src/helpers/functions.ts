export const convertToCurrency = (price: number): string => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

export const getImageUrl = (img: string): string => {
	return new URL(`../images/${img}`, import.meta.url).href;
};
