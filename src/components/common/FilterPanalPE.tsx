// components/FilterPanel.tsx
"use client";
import { FILTERS } from "@/lib/filterTypes";

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
						className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
						<div className="w-16 h-16 rounded-md bg-gray-200">
							{/* Preview thumbnail would go here */}
						</div>
						<span className="text-xs">{filter.name}</span>
					</button>
				))}
			</div>
		</div>
	);
}
