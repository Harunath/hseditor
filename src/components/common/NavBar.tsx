import React from "react";

const NavBar = () => {
	return (
		<div className="fixed top-0 left-0 right-0 px-4 sm:px-12 md:px-16 lg:px-36 h-24 w-full flex justify-between items-center backdrop-blur-3xl z-10">
			<div>
				<p className="text-3xl">PE</p>
			</div>
			<div>
				<ul className="flex space-x-4">
					<li>Home</li>
					<li>About</li>
					<li>Contact</li>
				</ul>
			</div>
			<div>
				<p>Try PE</p>
			</div>
		</div>
	);
};

export default NavBar;
