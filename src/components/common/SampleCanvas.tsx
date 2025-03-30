"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage } from "fabric";
import { FILTERS } from "@/lib/filterTypes";
import FilterPanel from "./FilterPanal";
// import ImageN from "next/image";
import ImageMask from "./ImageMask";
// import Button from "../ui/Button";

type SampleEditorProps = {
	imageUrl: string;
};

export default function SampleCanvas({ imageUrl }: SampleEditorProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
	const [currentImage, setCurrentImage] = useState<FabricImage | null>(null);
	const [before, setBefore] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) setBefore(false); // md: is 768px in Tailwind
		};

		handleResize(); // Check on initial render
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Initialize canvas
	useEffect(() => {
		if (!canvasRef.current || before) return;
		// Get parent container dimensions
		const parent = canvasRef.current.parentElement;
		const maxWidth = parent?.clientWidth || 400;
		const size = Math.min(maxWidth, 400); // Cap at 800px

		const initCanvas = new Canvas(canvasRef.current, {
			width: size,
			height: size, // Square aspect ratio
			backgroundColor: "#fff",
		});

		// Handle window resizing
		const handleResize = () => {
			const newSize = Math.min(
				canvasRef.current?.parentElement?.clientWidth || 400,
				400
			);
			initCanvas.setDimensions({ width: newSize, height: newSize });
			initCanvas.renderAll();
		};

		window.addEventListener("resize", handleResize);
		setFabricCanvas(initCanvas);
		console.log("inside uf1", initCanvas);

		return () => {
			window.removeEventListener("resize", handleResize);
			initCanvas.dispose();
		};
	}, [before]);

	// Load image
	useEffect(() => {
		if (!fabricCanvas || !imageUrl || before === true) return;
		const setImage = async () => {
			// this is to create Image element but it is confusing with Image from next/image
			const img = new Image();
			img.src = imageUrl;
			img.crossOrigin = "anonymous";

			img.onload = () => {
				if (!fabricCanvas) return;

				// Calculate scaling to fit canvas
				const canvasWidth = fabricCanvas.getWidth();
				const canvasHeight = fabricCanvas.getHeight();
				const scale = Math.min(
					canvasWidth / img.width,
					canvasHeight / img.height
				);

				const fabricImg = new FabricImage(img, {
					scaleX: scale,
					scaleY: scale,
					originX: "center",
					originY: "center",
					left: canvasWidth / 2,
					top: canvasHeight / 2,
					selectable: false, // Prevent selection
					evented: false, // Disable interaction
					lockMovementX: true,
					lockMovementY: true,
					hasControls: false, // Remove resize handles
				});
				fabricCanvas.clear();
				fabricCanvas.add(fabricImg);
				setCurrentImage(fabricImg);
				fabricCanvas.requestRenderAll();
			};

			img.onerror = (error) => {
				console.error("Image loading failed:", error);
			};
		};

		setImage();
	}, [fabricCanvas, imageUrl, before]);

	useEffect(() => {
		if (!fabricCanvas || !imageUrl || before === true) return;
		applyFilter("Cool Tone");
	});

	const applyFilter = (filterName: string) => {
		if (!currentImage) return;

		const filter = FILTERS.find((f) => f.name === filterName);
		if (filter) {
			filter.apply(currentImage);
			currentImage.applyFilters();
			console.log(currentImage.filters);
			fabricCanvas?.requestRenderAll();
		}
	};

	// const resetImage = async () => {
	// 	const img = new Image();
	// 	img.src = imageUrl;
	// 	img.crossOrigin = "anonymous";

	// 	img.onload = () => {
	// 		if (!fabricCanvas) return;

	// 		// Calculate scaling to fit canvas
	// 		const canvasWidth = fabricCanvas.getWidth();
	// 		const canvasHeight = fabricCanvas.getHeight();
	// 		const scale = Math.min(
	// 			canvasWidth / img.width,
	// 			canvasHeight / img.height
	// 		);

	// 		const fabricImg = new FabricImage(img, {
	// 			scaleX: scale,
	// 			scaleY: scale,
	// 			originX: "center",
	// 			originY: "center",
	// 			left: canvasWidth / 2,
	// 			top: canvasHeight / 2,
	// 		});

	// 		fabricCanvas.clear();
	// 		fabricCanvas.add(fabricImg);
	// 		setCurrentImage(fabricImg);
	// 		fabricCanvas.requestRenderAll();
	// 	};

	// 	img.onerror = (error) => {
	// 		console.error("Image loading failed:", error);
	// 	};
	// };

	return (
		<div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
			<div className="flex justify-center items-center w-fit p-4 rounded-xl">
				<ImageMask imgUrl={imageUrl}>
					<canvas
						ref={canvasRef}
						className="border w-[300px] h-[300px] border-gray-300 rounded-lg shadow-sm"
						width={300}
						height={300}
					/>
				</ImageMask>
			</div>

			<div className="flex md:flex-col gap-2 w-fit bg-white/10 backdrop-blur-sm p-4 rounded-xl">
				<FilterPanel onSelectFilter={applyFilter} />
			</div>
		</div>
	);
}
