import { FabricImage, filters } from "fabric";
import img1 from "@/../../public/filters/1.png";
import img2 from "@/../../public/filters/2.png";
import img3 from "@/../../public/filters/3.png";
import img4 from "@/../../public/filters/4.png";
import img5 from "@/../../public/filters/5.png";
import img6 from "@/../../public/filters/6.png";

// types/filterTypes.ts
export type Filter = {
	name: string;
	apply: (image: FabricImage) => void;
	imgUrl: string;
};

export const FILTERS: Filter[] = [
	{
		name: "Vintage",
		apply: (image) => {
			image.filters = [new filters.Sepia(), new filters.Noise({ noise: 50 })];
		},
		imgUrl: img1.src,
	},
	{
		name: "Black & White",
		apply: (image) => {
			image.filters = [new filters.Grayscale()];
		},
		imgUrl: img2.src,
	},
	{
		name: "Cool Tone",
		apply: (image) => {
			image.filters = [
				new filters.Brightness({ brightness: -0.05 }),
				new filters.HueRotation({ rotation: -0.3 }),
			];
		},
		imgUrl: img3.src,
	},
	{
		name: "Warm Tone",
		apply: (image) => {
			image.filters = [
				new filters.Sepia({ alpha: 0.1 }),
				new filters.Contrast({ contrast: 0.001 }),
			];
		},
		imgUrl: img4.src,
	},
	{
		name: "Vibrance",
		apply: (image) => {
			image.filters = [
				new filters.Vibrance({ vibrance: 1 }),
				new filters.Gamma(),
			];
		},
		imgUrl: img5.src,
	},
	{
		name: "Overlay Blend",
		apply: (image) => {
			// Create overlay matching the image dimensions
			const overlay = createColorOverlay(
				"#f0f0f0",
				0.8,
				image.width! * image.scaleX!,
				image.height! * image.scaleY!
			);

			image.filters = [
				new filters.BlendColor({
					image: overlay,
					mode: "overlay",
					alpha: 0.8,
				}),
			];
		},
		imgUrl: img6.src,
	},
];

const createColorOverlay = (
	color: string,
	opacity: number,
	width: number = 100,
	height: number = 100
) => {
	const el = document.createElement("canvas");
	el.width = Math.max(1, Math.floor(width));
	el.height = Math.max(1, Math.floor(height));
	const ctx = el.getContext("2d")!;
	ctx.fillStyle = color;
	ctx.globalAlpha = opacity;
	ctx.fillRect(0, 0, el.width, el.height);
	return new FabricImage(el);
};
