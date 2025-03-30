import SampleDisplay from "@/components/home/SampleDisplay";
import AiPhotoComponent from "@/components/home/AiPhotoCompont";
import Hero from "@/components/home/Hero";
import { PromoBanner } from "@/components/home/PromoBanner";

export default function Home() {
	return (
		<div>
			<Hero />
			<SampleDisplay />
			<AiPhotoComponent />
			<PromoBanner />
		</div>
	);
}
