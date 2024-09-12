import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getAllVideosOfUser,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import {  generateStreamedUrl } from '../middlewares/generateStremedVideoUrl.js';

const router = Router();

router.route("/allVideos").get(getAllVideos);
router.route("/:videoId").get(getVideoById);
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllVideosOfUser)
    .post(
        upload.fields([
            {
                name: "videoUrl",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        generateStreamedUrl,
        publishAVideo
    );

router
    .route("/:videoId")
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router