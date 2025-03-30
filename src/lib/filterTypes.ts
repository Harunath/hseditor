import { FabricImage, filters } from "fabric";

// types/filterTypes.ts
export type Filter = {
	name: string;
	apply: (image: FabricImage) => void;
};

export const FILTERS: Filter[] = [
	{
		name: "Vintage",
		apply: (image) => {
			image.filters = [new filters.Sepia(), new filters.Noise({ noise: 50 })];
		},
	},
	{
		name: "Black & White",
		apply: (image) => {
			image.filters = [new filters.Grayscale()];
		},
	},
	{
		name: "Cool Tone",
		apply: (image) => {
			image.filters = [
				new filters.Brightness({ brightness: -0.05 }),
				new filters.HueRotation({ rotation: -0.3 }),
			];
		},
	},
	{
		name: "Warm Tone",
		apply: (image) => {
			image.filters = [
				new filters.Sepia({ alpha: 0.1 }),
				new filters.Contrast({ contrast: 0.001 }),
			];
		},
	},
	{
		name: "Vibrance",
		apply: (image) => {
			image.filters = [
				new filters.Vibrance({ vibrance: 1 }),
				new filters.Gamma(),
			];
		},
	},
	{
		name: "Overlay Blend",
		apply: (image) => {
			image.filters = [
				new filters.BlendColor({
					image: createColorOverlay("#f0f0f0", 0.8),
					mode: "overlay",
				}),
			];
		},
	},
];

// Helper function to create color overlays
const createColorOverlay = (color: string, opacity: number) => {
	const el = document.createElement("canvas");
	el.width = 100; // Will stretch to image size
	el.height = 100;
	const ctx = el.getContext("2d")!;
	ctx.fillStyle = color;
	ctx.globalAlpha = opacity;
	ctx.fillRect(0, 0, el.width, el.height);
	return new FabricImage(el);
};
