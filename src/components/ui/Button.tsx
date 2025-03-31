import React, { ReactNode } from "react";

const Button = ({ children }: { children: ReactNode }) => {
	return (
		<button className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 px-4 rounded-full hover:text-black transform duration-200">
			{children}
		</button>
	);
};

export default Button;
