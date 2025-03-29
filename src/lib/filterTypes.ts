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
];
