"use client";
import { useEffect, useRef, useState } from "react";
// import fabric from "@/lib/fabric-init";
// import fabric from "fabric";
// import Fabric from "@/lib/fabric-init";
import { Canvas, FabricImage, Circle } from "fabric";
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
				canvasRef.current?.parentElement?.clientWidth || 800,
				800
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

		let cropWidth: number, cropHeight: number;

		if (canvasWidth / canvasHeight > widthRatio / heightRatio) {
			cropHeight = canvasHeight;
			cropWidth = (widthRatio / heightRatio) * cropHeight;
		} else {
			cropWidth = canvasWidth;
			cropHeight = (heightRatio / widthRatio) * cropWidth;
		}

		currentImage.set({
			scaleX: cropWidth / currentImage.getScaledWidth(),
			scaleY: cropHeight / currentImage.getScaledHeight(),
		});

		fabricCanvas.requestRenderAll();
		fabricCanvas.centerObject(currentImage);
	};

	// Circular crop (mask)
	const applyCircularCrop = () => {
		if (!fabricCanvas || !currentImage) return;

		const circle = new Circle({
			radius:
				Math.min(
					currentImage.getScaledWidth(),
					currentImage.getScaledHeight()
				) / 2,
			fill: "transparent",
			originX: "center",
			originY: "center",
			left: currentImage.left,
			top: currentImage.top,
		});

		currentImage.clipPath = circle;
		fabricCanvas.requestRenderAll();
		fabricCanvas.centerObject(currentImage);
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
		<div className="flex flex-col gap-4">
			<div className="space-y-4">
				{/* <Image
					src={imageUrl}
					alt="Original Image"
					width={400}
					height={400}
					id="img"
					className=" hidden"
				/> */}
				<canvas
					ref={canvasRef}
					className="border border-gray-300 rounded-lg shadow-sm"
					width={400}
					height={400}
				/>

				<div className="flex gap-2 flex-wrap">
					<button
						onClick={() => cropToRatio(1, 1)}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
						1:1 Square
					</button>
					<button
						onClick={() => cropToRatio(4, 5)}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
						4:5 Portrait
					</button>
					<button
						onClick={applyCircularCrop}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
						Circle
					</button>
					<button
						onClick={resetImage}
						className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
						Reset
					</button>

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
						className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors ml-auto">
						Save Image
					</button>
				</div>
				<FilterPanel onSelectFilter={applyFilter} />
			</div>
		</div>
	);
}
