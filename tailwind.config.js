/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			screens: {
				xxs: "320px",
				xs: "480px",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"pulse-btn": {
					from: { opacity: "0" },
					to: { opacity: "100" },
				},
			},
			colors: {
				darkGreen: "#008170",
				smoke: "#FDFEFE",
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse-btn": "pulse-btn 0.5s ease-in-out",
			},
		},
	},
	plugins: [],
};
