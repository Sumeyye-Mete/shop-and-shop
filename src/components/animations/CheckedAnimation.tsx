import "./animation.css";

type PropType = {
	className: string;
};

const CheckedAnimation = ({ className = "" }: PropType) => {
	return (
		<span className={`${className} animated-check`}>
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 130.2 130.2"
			>
				<circle
					className="path circle"
					fill="none"
					stroke="#008170"
					strokeWidth="16"
					strokeMiterlimit="10"
					cx="65.1"
					cy="65.1"
					r="56.1"
				/>
				<polyline
					className="path check"
					fill="none"
					stroke="#008170"
					strokeWidth="16"
					strokeLinecap="round"
					strokeMiterlimit="10"
					points="94.2,46.2 51.5,88.8 33.8,71.2"
				/>
			</svg>
		</span>
	);
};

export default CheckedAnimation;
