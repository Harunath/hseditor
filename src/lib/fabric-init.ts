// lib/fabric-init.ts
import fabric from "fabric";

// Type augmentation for Fabric.js
declare global {
	interface Window {
		fabric: typeof fabric;
	}
}

// Type-safe initialization
const initFabric = () => {
	if (typeof window !== "undefined") {
		// Directly assign fabric to window.fabric without additional type augmentation
		window.fabric = fabric as typeof fabric &
			typeof import("fabric/fabric-impl");
	}
	return fabric;
};

// Initialize and export
const Fabric = initFabric();
export default Fabric;
