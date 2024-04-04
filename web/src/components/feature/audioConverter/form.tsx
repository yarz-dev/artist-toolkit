"use client";
import MusicalNoteIcon from "@heroicons/react/24/solid/MusicalNoteIcon";
import {
	FormEvent,
	useState,
} from "react";


export default function AudioForm() {
	const [files, setFiles] = useState<FileList | null>(null);

	const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// const formData = new FormData();
		// formData.append("audioFiles", fileRef?.current?.files);

		// const response = await fetch("/api/convert", {
		// 	method: "POST",
		// 	body: formData,
		// });

		// if (response.ok) {
		// 	const blob = await response.blob();
		// 	const url = window.URL.createObjectURL(blob);
		// 	const a = document.createElement("a");
		// 	a.style.display = "none";
		// 	a.href = url;
		// 	a.download = "converted.mp3";
		// 	document.body.appendChild(a);
		// 	a.click();
		// 	window.URL.revokeObjectURL(url);
		// } else {
		// 	alert("Failed to convert audio");
		// }
	};

	return (
		<form
			onSubmit={(e) => handleUpload(e)}
			className="flex flex-col justify-center items-center p-3 w-[100%] h-[100%]"
		>
			<div className="flex-1 text-right w-full p-7 ring-1 ring-slate-200 bg-blue-500/10 flex flex-col rounded-md justify-center items-center">
				<div className="relative pb-4">
					<div className="p-8 bg-slate-300/30 rounded-xl ring-0 ring-slate-400">
						<MusicalNoteIcon
							className="h-10 w-10 text-slate-700"
							aria-hidden="true"
						/>
					</div>
				</div>
				<div className="inline-block text-left w-full relative cursor-pointer">
					<button
						type="button"
						className="cursor-pointer inline-flex w-full justify-center rounded-md bg-black/15 px-4 py-3 text-sm text-slate-600 font-semibold hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
					>
						Upload Audio
					</button>

					<input
						type="file"
						accept="audio/*"
						required
						multiple
						className="opacity-0 cursor-pointer absolute top-0 left-0 right-0 bottom-0"
						onChange={(e) => {
							setFiles(e.target.files);
						}}
					/>
				</div>
			</div>

			<button
				type="submit"
				className="bg-gray-700 text-slate-50 p-3 rounded-md w-[100%] my-2"
			>
				Convert
			</button>
		</form>
	);
}
