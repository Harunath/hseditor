"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import Button from "../ui/Button";

const AiPhotoComponent = () => {
	return (
		<div className="flex flex-col items-center justify-between max-w-5xl mx-auto p-16 mt-20 relative rounded-lg overflow-hidden">
			{/* Background Gradient Animation */}
			<motion.div
				className="absolute inset-0 rounded-full blur-3xl opacity-40"
				initial={{ scale: 1.2, x: "-50%", y: "-50%" }}
				animate={{
					scale: [1, 1.3, 1],
					x: ["-40%", "50%", "-50%"],
					y: ["-50%", "30%", "-50%"],
					backgroundColor: [
						"#8B5CF6", // Purple
						"#F5F5F5",
						"#EC4899", // Pink
						"#DA70D6",
						"#6366F1", // Violet
						"#BA2BE2",
						"#F43F5E", // Red
						"#3B82F6", // Blue
						"#FB923C", // Orange
						"#8B5CF6",
					],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
					backgroundColor: {
						duration: 10,
						repeat: Infinity,
						ease: "easeInOut",
					},
				}}></motion.div>

			{/* Image Stack */}
			<div className="relative w-[200px]  h-[300px] mb-20">
				<motion.div
					className="absolute w-full inset-0 -left-20 rounded-2xl"
					initial={{ rotate: -20, y: 10 }}>
					<Image
						src="https://res.cloudinary.com/degrggosz/image/upload/v1743151790/quiraing_mountains_landscape_view_isle_of_skye_szlr6t.jpg"
						alt="AI Generated 1"
						layout="fill"
						objectFit="cover"
						className="rounded-2xl shadow-lg"
					/>
				</motion.div>
				<motion.div
					className="absolute w-full inset-0 -left-8 rounded-2xl"
					initial={{ rotate: -10, y: 0 }}>
					<Image
						src="https://res.cloudinary.com/degrggosz/image/upload/v1743305854/64bde2b2-1db1_shcaky.webp"
						alt="AI Generated 2"
						layout="fill"
						objectFit="cover"
						className="rounded-2xl shadow-lg"
					/>
				</motion.div>
				<motion.div
					className="absolute inset-0 left-4 w-full rounded-2xl overflow-hidden"
					initial={{ rotate: 0, y: 10 }}>
					<Image
						src="https://res.cloudinary.com/degrggosz/image/upload/v1743305780/TatianaNY05_A_hyper-realistic_photo_of_a_plus-size_woman_wearin_e4a99be9-e359-402e-8991-41dc91dcc82a_lddt8e.png"
						alt="AI Generated 3"
						layout="fill"
						objectFit="cover"
						className="rounded-2xl shadow-lg"
					/>
				</motion.div>
			</div>
			<div className="max-w-lg text-center md:text-left space-y-4 mt-6 md:mt-0">
				<div className="flex items-center space-x-2">
					<span className="bg-purple-600 text-nowrap text-white text-sm font-bold px-3 py-1 rounded-full">
						HS AI
					</span>
					<span className="text-purple-500 text-nowrap text-sm font-semibold">
						Highly Improved Image Generation
					</span>
				</div>
				<h2 className="text-4xl font-bold">
					Generate photos of yourself, with AI
				</h2>
				<p className="text-gray-500">
					Get professional-quality photos of yourself with stunning realism,
					with the help of AI.
				</p>
				<Button>
					<p className="flex items-center gap-x-2 p-2 text-white ">
						Discover AI Photos <FaExternalLinkAlt />
					</p>
				</Button>
			</div>
		</div>
	);
};

export default AiPhotoComponent;
