type PropType = {
	title: string;
};

const PageHeader = ({ title }: PropType) => {
	let heading: string = title.toLocaleUpperCase();

	if (title.indexOf("-") >= 0) {
		heading = heading.replace("-", " ");
	}

	return <div className="container text-3xl capitalize my-11">{heading}</div>;
};

export default PageHeader;
