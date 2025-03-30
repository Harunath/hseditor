"use client";
import { useState } from "react";
import FabricEditor from "@/components/common/FabricEditor";
import Image from "next/image";
import Button from "../ui/Button";

export default function PhotoEditor() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [savedImage, setSavedImage] = useState<string>("");

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageUrl(URL.createObjectURL(file));
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Photo Editor</h1>

			{!imageUrl && (
				<Button>
					<label className="p-2 mb-4 cursor-pointer">
						Upload Image
						<input
							type="file"
							accept="image/*"
							onChange={handleFileUpload}
							className="hidden"
						/>
					</label>
				</Button>
			)}

			{imageUrl && (
				<FabricEditor
					imageUrl={imageUrl}
					onSave={(dataUrl) => setSavedImage(dataUrl)}
				/>
			)}

			{savedImage && (
				<div className="mt-8">
					<h2 className="text-xl font-semibold mb-2">Saved Image</h2>
					<Image
						src={savedImage}
						alt="Edited result"
						className="max-w-xs border"
						height={400}
						width={400}
					/>
					<a
						href={savedImage}
						download="edited-image.png"
						className="block mt-2 text-blue-500">
						Download Full Size
					</a>
				</div>
			)}
			{imageUrl && (
				<div className="mb-4">
					<button
						onClick={() => setImageUrl("")}
						className="bg-blue-500 text-white px-4 py-2 mb-4  rounded">
						change Image
					</button>
				</div>
			)}
		</div>
	);
}
