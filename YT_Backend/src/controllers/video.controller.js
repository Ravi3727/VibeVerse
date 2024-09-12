import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteOnCloudinary,
  deleteVideoOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";


const getAllVideos = asyncHandler(async (req,res) => {
  try {
    const allVideos = await Video.find({});
    // console.log("All video for home page: " + allVideos);
    return res
      .status(201)
      .json(new ApiResponse(200, allVideos, "Video fetched successfully"));

  } catch (error) {
    console.error(`Error fetching videos: ${error.message}`);
    throw new ApiError(500, error.message);
  }

});
const getAllVideosOfUser = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
  //TODO: get all videos based on query, sort, pagination
  // Convert page and limit to numbers
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Validate page and limit values
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  const matchStage = {};
  if (userId && isValidObjectId(userId)) {
    matchStage["$match"] = {
      owner: new mongoose.Types.ObjectId(userId),
    };
  } else if (query) {
    matchStage["$match"] = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    };
  } else {
    matchStage["$match"] = {};
  }
  if (userId && query) {
    matchStage["$match"] = {
      $and: [
        { owner: new mongoose.Types.ObjectId(userId) },
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
      ],
    };
  }

  const sortStage = {};
  if (sortBy && sortType) {
    sortStage["$sort"] = {
      [sortBy]: sortType === "asc" ? 1 : -1,
    };
  } else {
    sortStage["$sort"] = {
      createdAt: -1,
    };
  }

  const skipStage = { $skip: (page - 1) * limit };
  const limitStage = { $limit: limit };

  const videos = await Video.aggregate([
    matchStage,
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              fullname: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $lookup:{
        from:"likes",
        localField:"_id",
        foreignField:"video",
        as:"likes"
      }
    },
    sortStage,
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
        likes:{
          $size:"$likes"
        }
      },
    },
  ]);

  if (!videos) {
    throw new ApiError(404, "No videos found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "video fetched successfully !"));
})


const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id;
  try {
    const videoUrl = req?.files.videoUrl;
    const StreemingVideoUrl = req?.streaming;
    console.log("Streeming url  " + StreemingVideoUrl);

    console.log("all set");
    const thumbnail = req?.files.thumbnail;
    // console.log("thumbnail here", thumbnail);
    // console.log("UploadVideoUrl " + videoUrl);
  if (!title || !description || !videoUrl || !thumbnail || !StreemingVideoUrl) {
      throw new ApiError(400, "Missing data");
    }
    //Uploading video File to Cloudinary
    const videoFile = videoUrl
      ? await uploadOnCloudinary(
        videoUrl[0].path,
        // uploadVideoUrl,
        process.env.FOLDER_NAME,
        null,
        100
      )
      : null;
    // console.log("videoFile here", videoFile);
    // Uploading Thumbnail image to Cloudinary
    const thumbnailFile = thumbnail
      ? await uploadOnCloudinary(
        thumbnail[0].path,
        process.env.FOLDER_NAME,
        null,
        100
      )
      : null;
    // console.log("thumbnailFile", thumbnailFile);
    const newVideo = await Video.create({
      videoFile: StreemingVideoUrl,
      // videoFile: videoUrl[0].path,
      thumbnail: thumbnailFile.secure_url,
      title,
      description,
      duration: (videoFile.duration / 60).toFixed(2),
      owner: userId,
    });
    res
      .status(201)
      .json(new ApiResponse(200, newVideo, "Video uploaded successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}); // successfully publish kardia

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  // console.log("Helooo Jee ");
  // console.log("video" + videoId)
  try {
    const result = await Video.findById(videoId);
    // console.log("result" + result)
    if (!result) {
      throw new ApiError(400, "Could not find video");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, result, "Video fetched successfully"));
  } catch (error) {
    console.log("something went wrong");

    throw new ApiError(500, "something went wrong", error.message);
  }
}); // successfully video fetch karlia

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Video.findById(videoId);
    const { title, description } = req.body;
    const thumbnail = req.file;
    if (!title && !description && !thumbnail) {
      throw new ApiError(400, "Please provide atleast one filed");
    }
    //upload new thumbnail
    let imgUrl;
    if (thumbnail) {
      imgUrl = await uploadOnCloudinary(thumbnail.path);
    }
    //Delete old thumbnail
    const thumbnailToDelete = video.thumbnail;
    console.log(thumbnailToDelete);
    thumbnailToDelete ? deleteOnCloudinary(thumbnailToDelete) : null;
    const updatedVideo = await Video.findOneAndUpdate(
      { _id: videoId },
      {
        title,
        description,
        thumbnail: imgUrl.secure_url,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
}); //done

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Video.findById(videoId);
    console.log("this video", video);
    if (!video) {
      throw new ApiError(400, "Video not found");
    }
    //delete video from cloudinary
    const videoToDelete = await deleteVideoOnCloudinary(video?.videoFile);
    //delete thumbnail from cloudinary
    console.log(video?.thumbnail);
    const thumbnailToDelete = await deleteOnCloudinary(video?.thumbnail);
    const result = await Video.findByIdAndDelete(videoId);
    //delete video from owner
    if (!result) {
      throw new ApiError(400, "Cannot delete video");
    }
    res
      .status(201)
      .json(new ApiResponse(200, result, "Video deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(404, "Video not found");
    }
    video.isPublished = !video.isPublished;
    await video.save();
    res
      .status(200)
      .json(new ApiResponse(200, video, "changes made successfull"));
  } catch (error) {
    throw new ApiError(500, "something went wrong", error.message);
  }
}); //nailed it

export {
  getAllVideos,
  getAllVideosOfUser,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
