import { FaCopyright, FaBuilding, FaRegCreditCard } from "react-icons/fa";
import { SiReact } from "react-icons/si";

export function FooterPage() {
	return (
		<footer className=" text-white text-sm py-8 px-4 mt-20">
			<div className="max-w-6xl mx-auto">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4">
					{/* Left side - Copyright and info */}
					<div className="flex flex-col space-y-2">
						<div className="flex items-center">
							<FaCopyright className="mr-1" />
							<span>
								Copyright © HS Editor | Your Address Here, City, Country
							</span>
						</div>

						<div className="flex items-center">
							<FaBuilding className="mr-1" />
							<span>Company Register 123456789 | REA Number XY123456</span>
						</div>

						<div className="flex items-center">
							<FaRegCreditCard className="mr-1" />
							<span>Contributed capital €XX,XXX.XX</span>
						</div>
					</div>

					{/* Right side - Logo and social */}
					<div className="flex flex-col items-center md:items-end space-y-2">
						<div className="flex items-center text-blue-600">
							<SiReact className="text-2xl mr-2" />
							<span className="text-lg font-semibold">HS Editor</span>
						</div>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-500 hover:text-blue-600 transition-colors">
								Terms
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-blue-600 transition-colors">
								Privacy
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-blue-600 transition-colors">
								Contact
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
