import { ReactNode } from "react";

export default function FeatureCard({ children }: { children: ReactNode }) {
	return (
		<div className="m-5 shadow-sm rounded-md min-h-40 w-[90%] lg:w-[40%] md:w-[50%] sm:w-[60%] bg-white">
			{children}
		</div>
	);
}
