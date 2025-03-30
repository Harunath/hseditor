"use client";
import { useState } from "react";
import SampleCanvas from "../common/SampleCanvas";
import Image from "next/image";

const images = [
	{
		url: "https://res.cloudinary.com/degrggosz/image/upload/v1743151790/quiraing_mountains_landscape_view_isle_of_skye_szlr6t.jpg",
		name: "landscape",
	},
	{
		url: "https://res.cloudinary.com/degrggosz/image/upload/v1743332458/GettyImages-1458818451-a6d932e090914d9191c7a31b767ca1b9_uf0rze.jpg",
		name: "potrait",
	},
	{
		url: "https://res.cloudinary.com/degrggosz/image/upload/v1743305854/64bde2b2-1db1_shcaky.webp",
		name: "modern art",
	},
];

const SampleDisplay = () => {
	const [selectedImage, setSelectedImage] = useState<string>(
		"https://res.cloudinary.com/degrggosz/image/upload/v1743151790/quiraing_mountains_landscape_view_isle_of_skye_szlr6t.jpg"
	);
	return (
		<div className=" bg-black p-4 rounded-xl">
			<div>
				<p className=" text-xl font-semibold">Filter Demo</p>
			</div>
			<div className="mx-auto max-w-[340px] flex items-center justify-between gap-x-4 my-5 bg-white/10 backdrop-blur-sm rounded-xl p-4">
				{images.map((image, index) => (
					<div
						key={index}
						className="cursor-pointer"
						onClick={() => setSelectedImage(image.url)}>
						<Image
							src={image.url}
							alt={`Sample ${index}`}
							className="w-16 sm:w-20 h-auto object-cover rounded"
							height={96}
							width={80}
						/>
						<p className=" text-xs font-light text-center mt-2">{image.name}</p>
					</div>
				))}
			</div>
			<SampleCanvas imageUrl={selectedImage} />
		</div>
	);
};

export default SampleDisplay;
