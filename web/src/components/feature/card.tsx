import { ReactNode } from "react";

export default function FeatureCard({ children }: { children: ReactNode }) {
	return (
		<div className="m-5 mt-10 shadow-sm rounded-md min-h-60 w-[80%] lg:w-[40%] md:w-[50%] sm:w-[60%] bg-white ">
			{children}
		</div>
	);
}
