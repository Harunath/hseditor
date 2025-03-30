"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, FabricImage } from "fabric";
import { FILTERS } from "@/lib/filterTypes";
import Button from "../ui/Button";
import { IoSwapVertical, IoSwapHorizontal } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RxReset } from "react-icons/rx";
import FilterPanelPE from "./FilterPanalPE";

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

			// In your image loading useEffect
			img.onload = () => {
				if (!fabricCanvas) return;

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
					// Add these properties to lock dimensions
					lockScalingX: true,
					lockScalingY: true,
					lockMovementX: true,
					lockMovementY: true,
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
		if (!currentImage || !fabricCanvas) return;

		// Store current dimensions and position before applying filter
		const originalScaleX = currentImage.scaleX;
		const originalScaleY = currentImage.scaleY;
		const originalLeft = currentImage.left;
		const originalTop = currentImage.top;

		const filter = FILTERS.find((f) => f.name === filterName);
		if (filter) {
			// Apply the filter
			filter.apply(currentImage);

			// Reapply original dimensions after filter
			currentImage.set({
				scaleX: originalScaleX,
				scaleY: originalScaleY,
				left: originalLeft,
				top: originalTop,
			});
			currentImage.applyFilters();

			fabricCanvas.requestRenderAll();
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

			<div className="relative flex items-center no-scrollbar bg-black p-6 rounded-xl w-fit max-w-[90%] mx-auto overflow-x-auto">
				<div className="flex items-center gap-x-2 pl-2 pr-2">
					<Button>
						<button onClick={() => cropToRatio(4, 6)}>4:6</button>
					</Button>
					<Button>
						<button onClick={() => cropToRatio(5, 7)}>5:7</button>
					</Button>
					<Button>
						<button onClick={() => cropToRatio(6, 8)}>6:8</button>
					</Button>
					<Button>
						<button onClick={() => cropToRatio(8, 8)}>8:8</button>
					</Button>
					<Button>
						<button onClick={() => cropToRatio(5, 10)}>5:10</button>
					</Button>
					<Button>
						<button onClick={() => cropToRatio(8, 10)}>8:10</button>
					</Button>
					<Button>
						<button onClick={() => cropToRatio(10, 12)}>10:12</button>
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 w-[90%] mx-auto overflow-x-auto max-w-[600px]">
				<Button>
					<button
						onClick={() => flipImage("horizontal")}
						className="flex items-center justify-center gap-x-2 w-fit mx-auto">
						<span className="hidden md:block">Flip Horizontal</span>
						<IoSwapHorizontal />
					</button>
				</Button>
				<Button>
					<button
						onClick={() => flipImage("vertical")}
						className="flex items-center justify-center gap-x-2 w-fit mx-auto">
						<span className="hidden md:block">Flip Vertical</span>
						<IoSwapVertical />
					</button>
				</Button>
				<Button>
					<button
						onClick={handleSave}
						className="flex items-center justify-center gap-x-2 w-fit mx-auto">
						<span className="hidden md:block">Save Image</span>
						<IoMdAdd />
					</button>
				</Button>
				<Button>
					<button
						onClick={resetImage}
						className="flex items-center justify-center gap-x-2 w-fit mx-auto">
						<span className="hidden md:block">Reset</span>
						<RxReset />
					</button>
				</Button>
			</div>

			<FilterPanelPE onSelectFilter={applyFilter} />
		</div>
	);
}
