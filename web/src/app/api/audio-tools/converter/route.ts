import multer from "multer";
import FFmpeg from "ffmpeg";
import { exec } from "child_process";
import { PathLike, promises as fs } from "fs";
import { ParsedQs } from "qs";
import {
	Request as StaticResquest,
	Response as StaticResponse,
	ParamsDictionary,
} from "express-serve-static-core";

const upload = multer({ dest: "/tmp" });

export async function POST(req: StaticResquest, res: StaticResponse) {
	const convertAudio = async (
		fileName: string,
		filePath: string,
		outputFormat: string
	) => {
		return new Promise((resolve, reject) => {
			const outputPath = `/tmp/${fileName}.${outputFormat}`;
			new FFmpeg(outputPath, (error, file) => {
				if (error) {
					reject(error);
				} else {
					file.setVideoFormat("mp3");
					resolve(outputPath);
				}
			});
		});
	};

	const formData = (req as unknown as Request).formData();

	const fileHandlingMiddleware = upload.array("audioFiles");

	fileHandlingMiddleware(req, res, async (err) => {
		const files = (await formData).getAll("audioFiles") as File[];
		const conversionType = (await formData).get("conversionType") as string;

		if (err || !files || files?.length < 1) {
			if (err) console.error(err);
			return Response.json({ error: "Error uploading file." });
		}

		try {
			const convertedFilePaths = files.map(async (file) => {
				return await convertAudio(
					file.name,
					file.name,
					conversionType.toLowerCase()
				);
			});

			const fileBuffers = convertedFilePaths.map(async (path) => {
				return await fs.readFile((await path) as string);
			});

			res.setHeader(
				"Content-Disposition",
				"attachment; filename=converted.mp3"
			);

			res.setHeader("Content-Type", "audio/mpeg");

			res.end(fileBuffers);

			// Cleanup temp files
			files.forEach(async (file) => {
				await fs.unlink(file.name);
			});

			convertedFilePaths.forEach(async (path) => {
				await fs.unlink((await path) as string);
			});
		} catch (error) {
			console.error(error);
			Response.json({ error: "Error converting audio." });
		}
	});

	// const data = await res.json();

	return Response.json({ helo: "dfs" });
}

// export async function GET(req: StaticResquest, res: StaticResponse) {
// 	return Response.json(req.url);
// }
