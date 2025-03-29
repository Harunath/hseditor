"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
	return (
		<div className="relative min-h-96  flex flex-col justify-center items-center">
			<motion.div
				className="absolute inset-0 -z-10 flex justify-center items-center"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}>
				<div className="w-96 h-96 rounded-full bg-amber-300 bg-opacity-30 blur-xl" />
			</motion.div>
			<div className="flex-1 flex flex-col justify-center items-center">
				<div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-center">
					<p>Transform. Enhance. Create.</p>
				</div>
				<div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-center mt-2">
					<p>– Your Ultimate AI-Powered Photo Editor!</p>
				</div>
				<div className="mt-4">
					<button className="bg-white/50 text-lg sm:text-xl font-semibold backdrop-blur-2xl text-black px-8 py-2 rounded-full mt-4">
						Try PE
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
