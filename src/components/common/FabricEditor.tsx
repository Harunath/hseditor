"use client";
import { useEffect, useRef, useState } from "react";
// import fabric from "@/lib/fabric-init";
// import fabric from "fabric";
// import Fabric from "@/lib/fabric-init";
import { Canvas, FabricImage } from "fabric";
// import Image from "next/image";
import { FILTERS } from "@/lib/filterTypes";
import FilterPanel from "./FilterPanal";

type FabricEditorProps = {
	imageUrl: string;
	onSave?: (dataUrl: string) => void;
};

export default function FabricEditor({ imageUrl, onSave }: FabricEditorProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
	const [currentImage, setCurrentImage] = useState<FabricImage | null>(null);

	// Initialize canvas
	useEffect(() => {
		if (!canvasRef.current) return;

		// Get parent container dimensions
		const parent = canvasRef.current.parentElement;
		const maxWidth = parent?.clientWidth || 800;
		const size = Math.min(maxWidth, 800); // Cap at 800px

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

		return () => {
			window.removeEventListener("resize", handleResize);
			initCanvas.dispose();
		};
	}, []);

	// Load image
	useEffect(() => {
		if (!fabricCanvas || !imageUrl) return;

		const setImage = async () => {
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
	}, [fabricCanvas, imageUrl]);

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

	const resetImage = async () => {
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

	// Crop to specific size
	const cropToRatio = (widthRatio: number, heightRatio: number) => {
		if (!fabricCanvas || !currentImage) return;

		const canvasWidth = fabricCanvas.getWidth();
		const canvasHeight = fabricCanvas.getHeight();

		// 1. Calculate maximum possible dimensions while maintaining aspect ratio
		const canvasAspect = canvasWidth / canvasHeight;
		const targetAspect = widthRatio / heightRatio;

		let scale: number;

		if (canvasAspect > targetAspect) {
			// Canvas is wider than target - limit by height
			scale =
				canvasHeight /
				(currentImage.getScaledHeight() * (heightRatio / widthRatio));
		} else {
			// Canvas is taller than target - limit by width
			scale =
				canvasWidth /
				(currentImage.getScaledWidth() * (widthRatio / heightRatio));
		}

		// 2. Apply scaling with bounds checking
		const newScaleX = (currentImage.scaleX || 1) * scale;
		const newScaleY = (currentImage.scaleY || 1) * scale;

		currentImage.set({
			scaleX: Math.min(newScaleX, 1), // Never scale up beyond original
			scaleY: Math.min(newScaleY, 1),
			left: canvasWidth / 2,
			top: canvasHeight / 2,
			originX: "center",
			originY: "center",
		});

		// 3. Ensure image stays within bounds
		currentImage.setCoords();
		fabricCanvas.requestRenderAll();
	};

	// Flip image
	const flipImage = (axis: "horizontal" | "vertical") => {
		if (!currentImage) return;

		currentImage.set({
			flipX: axis === "horizontal" ? !currentImage.flipX : currentImage.flipX,
			flipY: axis === "vertical" ? !currentImage.flipY : currentImage.flipY,
		});
		fabricCanvas?.requestRenderAll();
		fabricCanvas?.centerObject(currentImage);
	};

	// Save/export image
	const handleSave = () => {
		if (!fabricCanvas) return;

		fabricCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
		const dataUrl = fabricCanvas.toDataURL({
			format: "png",
			quality: 1,
			multiplier: 1,
		});

		onSave?.(dataUrl);
	};

	return (
		<div className="flex flex-col items-center gap-4 w-full">
			<div className="max-w-[400px]">
				<canvas
					ref={canvasRef}
					className="border mx-auto border-gray-300 rounded-lg shadow-sm"
					width={300}
					height={300}
				/>
			</div>

			<div className="flex gap-2 w-[90%] mx-auto overflow-x-auto">
				<button
					onClick={() => cropToRatio(1, 1)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					1:1
				</button>
				<button
					onClick={() => cropToRatio(4, 6)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					4:6
				</button>
				<button
					onClick={() => cropToRatio(5, 7)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					5:7
				</button>
				<button
					onClick={() => cropToRatio(6, 8)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					6:8
				</button>
				<button
					onClick={() => cropToRatio(8, 8)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					8:8
				</button>
				<button
					onClick={() => cropToRatio(5, 10)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					5:10
				</button>
				<button
					onClick={() => cropToRatio(8, 10)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					8:10
				</button>
				<button
					onClick={() => cropToRatio(10, 12)}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					10:12
				</button>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-6 gap-2 w-[90%] mx-auto overflow-x-auto">
				<button
					onClick={() => flipImage("horizontal")}
					className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
					Flip Horizontal
				</button>
				<button
					onClick={() => flipImage("vertical")}
					className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
					Flip Vertical
				</button>

				<button
					onClick={handleSave}
					className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
					Save Image
				</button>
				<button
					onClick={resetImage}
					className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
					Reset
				</button>
			</div>

			<FilterPanel onSelectFilter={applyFilter} />
		</div>
	);
}
