"use client";
import { motion } from "framer-motion";
import Button from "../ui/Button";

export function PromoBanner() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-4xl mx-auto mt-24 p-6 bg-gradient-to-r from-purple-600/10 to-blue-500/10 backdrop-blur-sm rounded-xl shadow-lg text-white">
			<div className="flex flex-col text-center items-center justify-between gap-6">
				<div className="flex-1 space-y-3">
					<h1 className="text-2xl md:text-3xl font-bold">Try HS Editor now!</h1>
					<p className="text-sm md:text-base min-w-[300px] max-w-[600px]">
						Join the HS Editor community today and discover the transformative
						power of cutting-edge AI technology for yourself.
					</p>
				</div>
				<Button>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className="px-6 py-3 text-purple-500 font-semibold transition-all">
						Try HS Editor 1:2
					</motion.button>
				</Button>
			</div>
		</motion.div>
	);
}
