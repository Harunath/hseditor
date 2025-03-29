import Image from "next/image";
import React from "react";

const CropSample = () => {
	return (
		<div className="mt-5">
			<div>
				<Image
					src={
						"https://res.cloudinary.com/degrggosz/image/upload/v1743151790/quiraing_mountains_landscape_view_isle_of_skye_szlr6t.jpg"
					}
					alt="Crop Sample"
					height={400}
					width={400}
					className="rounded w-[400px] h-auto"
				/>
			</div>
		</div>
	);
};

export default CropSample;
