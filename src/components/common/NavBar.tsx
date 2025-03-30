import Link from "next/link";
import React from "react";
import Button from "../ui/Button";

const NavBar = () => {
	return (
		<div className="fixed top-0 left-0 right-0 px-4 sm:px-12 md:px-16 lg:px-36 h-24 w-full flex justify-between items-center backdrop-blur-3xl z-50">
			<div>
				<Link href={"/"} className="text-3xl">
					<h1>HS EDITOR</h1>
				</Link>
			</div>
			<div className="hidden sm:block">
				<ul className="flex space-x-4">
					<Link href="/">
						<li className="text-lg font-semibold hover:text-blue-500 transition-colors">
							Home
						</li>
					</Link>
					<Link href="/edit">
						<li className="text-lg font-semibold hover:text-blue-500 transition-colors">
							Edit
						</li>
					</Link>
				</ul>
			</div>
			<div>
				<Button>
					<Link href={"/edit"}>Get started</Link>
				</Button>
			</div>
		</div>
	);
};

export default NavBar;
