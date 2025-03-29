import CropSample from "@/components/home/CropSample";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import PhotoEditor from "@/components/common/PhotoEditor";

export default function Home() {
	return (
		<div>
			<Hero />
			<CropSample />
			<PhotoEditor />

			<Footer />
		</div>
	);
}
