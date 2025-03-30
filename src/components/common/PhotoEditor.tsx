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
			<h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
				Photo Editor
			</h1>
			{imageUrl && (
				<div className="my-4">
					<Button>
						<button onClick={() => setImageUrl("")}>change Image</button>
					</Button>
				</div>
			)}
			{!savedImage && (
				<div>
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
				</div>
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
					<div className="flex items-center gap-x-4">
						<Button>
							<a
								href={savedImage}
								download="edited-image.png"
								className="block text-blue-500 hover:text-blue-800">
								Download Full Size
							</a>
						</Button>
						<Button>
							<button onClick={() => setSavedImage("")}>Back to edit</button>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
