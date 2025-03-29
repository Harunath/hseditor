// components/FilterPanel.tsx
"use client";
import { FILTERS } from "@/lib/filterTypes";

export default function FilterPanel({
	onSelectFilter,
}: {
	onSelectFilter: (filterName: string) => void;
}) {
	return (
		<div className="flex gap-2 p-4 overflow-x-auto">
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
	);
}
