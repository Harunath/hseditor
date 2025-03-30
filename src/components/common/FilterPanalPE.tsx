// components/FilterPanel.tsx
"use client";
import { FILTERS } from "@/lib/filterTypes";
import Image from "next/image";

export default function FilterPanelPE({
	onSelectFilter,
}: {
	onSelectFilter: (filterName: string) => void;
}) {
	return (
		<div className="flex md:flex-col gap-2 w-fit bg-white/10 backdrop-blur-sm p-4 rounded-xl">
			<div
				className="h-fit w-[300px] md:w-fit flex flex-row gap-2 p-4 
                overflow-x-auto no-scrollbar flex-nowrap">
				{FILTERS.map((filter) => (
					<button
						key={filter.name}
						onClick={() => onSelectFilter(filter.name)}
						className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100/10 backdrop-blur-sm">
						<div className="w-16 h-auto rounded-md">
							<Image
								src={filter.imgUrl}
								alt={filter.name}
								height={64}
								width={64}
								className="w-16 h-auto rounded-md"
							/>
						</div>
						<span className="text-xs">{filter.name}</span>
					</button>
				))}
			</div>
		</div>
	);
}
