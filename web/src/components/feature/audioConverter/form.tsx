"use client";
import MusicalNoteIcon from "@heroicons/react/24/solid/MusicalNoteIcon";
import {
	FormEvent,
	Fragment,
	LegacyRef,
	useCallback,
	useRef,
	useState,
} from "react";
import FeatureCard from "../card";
import { TrashIcon } from "@heroicons/react/16/solid";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { convertAudio } from "src/app/actions";

const CONVERSION_TYPES: {
	name: string;
}[] = [
	{
		name: "MP3",
	},
	{
		name: "WAV",
	},
	{
		name: "AIFF",
	},
];

export default function AudioForm() {
	const [files, setFiles] = useState<File[]>([]);
	const [selected, setSelected] = useState(CONVERSION_TYPES[0]);

	const removeItem = useCallback(
		(file: File) => {
			setFiles(files.filter((_file) => _file.name != file.name));
		},
		[files]
	);

	const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("conversionType", selected.name);

		files?.forEach((file) => {
			formData.append("audioFiles", file);
		});

		const response = await fetch("/api/audio-tools/converter", {
			method: "POST",
			body: formData,
		});

		alert(response.ok);

		if (response.ok) {
			const blob = await response.blob();
			console.log(blob);
			// const url = window.URL.createObjectURL(blob);
			// const a = document.createElement("a");
			// a.style.display = "none";
			// a.href = url;
			// a.download = "converted.mp3";
			// document.body.appendChild(a);
			// a.click();
			// window.URL.revokeObjectURL(url);
		} else {
			alert("Failed to convert audio");
		}
	};

	return (
		<div className="w-full flex flex-col justify-center items-center py-10">
			<FeatureCard>
				<form
					encType="multipart/form-data"
					onSubmit={(e) => handleUpload(e)}
					className="flex flex-col justify-center items-center p-3 w-[100%] h-[100%]"
				>
					<div className="relative flex-1 text-right w-full p-7 ring-1 ring-slate-200 bg-blue-500/10 hover:bg-blue-500/15 flex flex-col rounded-md justify-center items-center">
						<div className="relative pb-4">
							<div className="p-8 bg-slate-300/30 rounded-xl ring-0 ring-slate-400">
								<MusicalNoteIcon
									className="h-10 w-10 text-slate-800"
									aria-hidden="true"
								/>
							</div>
						</div>
						<div className="inline-block text-left w-full relative cursor-pointer">
							<button
								type="button"
								className="cursor-pointer inline-flex w-full justify-center rounded-md bg-black/5 px-4 py-3 text-sm text-slate-800 font-semibold hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 border-dashed border border-slate-400"
							>
								{files?.length > 0 ? "Re-upload Audio" : "Upload Audio"}
							</button>
						</div>
						<input
							type="file"
							accept="audio/*"
							required
							multiple
							className="opacity-0 cursor-pointer absolute top-0 left-0 right-0 bottom-0"
							onChange={(e) => {
								const list: File[] = [];
								const files = e.target.files;
								if (files) {
									for (let i = 0; i < files.length; i++) {
										list.push(files[i]);
									}
								}
								setFiles(list);
							}}
						/>
					</div>

					{files?.length > 0 && (
						<>
							<div className="relative w-full  mt-3">
								<Listbox value={selected} onChange={setSelected}>
									<div className="relative ">
										<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-slate-100 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm">
											<span className="block truncate">{selected.name}</span>
											<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
												<ChevronUpDownIcon
													className="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</span>
										</Listbox.Button>
										<Transition
											as={Fragment}
											leave="transition ease-in duration-100"
											leaveFrom="opacity-100"
											leaveTo="opacity-0"
										>
											<Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
												{CONVERSION_TYPES.map((conversionType, index) => (
													<Listbox.Option
														key={index}
														className={({ active }) =>
															`relative cursor-default select-none py-2 pl-10 pr-4 rounded-md mx-1 ${
																active
																	? "bg-slate-300/30 text-slate-900"
																	: "text-gray-900"
															}`
														}
														value={conversionType}
													>
														{({ selected }) => (
															<>
																<span
																	className={`block truncate ${
																		selected ? "font-medium" : "font-normal"
																	}`}
																>
																	{conversionType.name}
																</span>
																{selected ? (
																	<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600">
																		<CheckIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	</span>
																) : null}
															</>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</Listbox>
								<small className="text-xs mx-2 text-slate-500 font-thin">
									Select Conversion Type
								</small>
							</div>
							<button
								type="submit"
								className="bg-gray-700 text-slate-50 p-3 rounded-md w-[100%] mt-3"
							>
								Convert
							</button>
						</>
					)}
				</form>
			</FeatureCard>

			{files?.length > 0 && (
				<FeatureCard>
					<div className="p-4">
						<div className="py-2">
							<h6 className="text-md font-bold">Your Files</h6>
						</div>
						{files.map((file, index) => {
							return (
								<div
									key={index}
									className="flex items-center bg-slate-400/5 p-2 rounded-xl my-1"
								>
									<div className="p-4 bg-slate-300/30 rounded-xl ring-0 ring-slate-400">
										<MusicalNoteIcon
											className="h-10 w-10 text-slate-800"
											aria-hidden="true"
										/>
									</div>
									<div className="p-4 mx-2 flex-1">
										<h1>{file.name}</h1>
									</div>
									<button
										onClick={() => {
											removeItem(file);
										}}
										className=" mx-2 bg-white border p-2 hover:shadow-sm rounded-xl hover:p-3 active:bg-slate-50/10"
									>
										<TrashIcon
											className="h-4 w-4 text-red-800"
											aria-hidden="true"
										/>
									</button>
								</div>
							);
						})}
					</div>
				</FeatureCard>
			)}
		</div>
	);
}
