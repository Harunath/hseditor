"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ImageMask = ({
	children,
	imgUrl = "https://res.cloudinary.com/degrggosz/image/upload/v1743151790/quiraing_mountains_landscape_view_isle_of_skye_szlr6t.jpg",
}: {
	children: ReactNode;
	imgUrl: string;
}) => {
	const [isMobile, setIsMobile] = useState(false);
	const [width, setWidth] = useState(150); // Initial width of c2
	const parentRef = useRef<HTMLDivElement>(null);
	const [maxWidth, setMaxWidth] = useState(300); // Default max width

	useEffect(() => {
		// Check if it's mobile view
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768); // md: 768px
			if (parentRef.current) {
				setMaxWidth(parentRef.current.clientWidth);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (isMobile) return;

		const startX = e.clientX;
		const startWidth = width;

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const newWidth = Math.min(
				Math.max(10, startWidth + (moveEvent.clientX - startX)),
				maxWidth
			);
			setWidth(newWidth);
		};

		const handleMouseUp = () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div
			ref={parentRef}
			className="relative w-[300px] h-[300px] bg-gray-300 no-select rounded-xl overflow-hidden">
			<motion.div
				className="absolute z-10 left-0 top-0 h-full"
				style={{ width: `${width}px` }}>
				<div
					className="absolute right-0 top-0 h-full w-[4px] bg-white/10 backdrop-blur-sm cursor-ew-resize shadow-2xl"
					onMouseDown={handleMouseDown}
				/>
				<Image
					src={imgUrl}
					className="h-full object-cover"
					height={300}
					width={300}
					alt="img"
				/>
			</motion.div>
			<div className=" w-full h-full">{children}</div>
		</div>
	);
};

export default ImageMask;
