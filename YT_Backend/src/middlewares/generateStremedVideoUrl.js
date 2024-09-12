import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { promisify } from "util";
import { exec } from "child_process";

const execPromise = promisify(exec);

export const generateStreamedUrl = asyncHandler(async (req, res, next) => {
    try {
        const lessonId = uuidv4();
        const outputPath = `./video_uploads/content/${lessonId}`;
        const videoUrl = req?.files?.videoUrl;

        if (!videoUrl || videoUrl.length === 0) {
            throw new ApiError(400, "Video file is required");
        }

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        const hlsPath = `${outputPath}/index.m3u8`;
        const ffmpegCommand = `ffmpeg -i ${videoUrl[0].path} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;

        try {
            const { stdout, stderr } = await execPromise(ffmpegCommand);
            console.log(`FFMPEG stdout: ${stdout}`);
            console.log(`FFMPEG stderr: ${stderr}`);
        } catch (error) {
            console.error(`FFMPEG exec error: ${error}`);
            throw new ApiError(500, `Error processing video: ${error.message}`);
        }

        const uploadVideoUrl = `http://localhost:3000/video_uploads/content/${lessonId}/index.m3u8`;
        console.log("url" + uploadVideoUrl);
        req.streaming = uploadVideoUrl;
        console.log("request" + req.streaming);
        next();
    } catch (error) {
        next(new ApiError(500, error.message || `Error in Streaming Middleware: ${error}`));
    }
});
