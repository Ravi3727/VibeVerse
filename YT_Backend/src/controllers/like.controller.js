import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId.trim() || !isValidObjectId(videoId)) {
      throw new ApiError(400, "video id is invalid or required!");
    }
    const video = await Video.findById(videoId);

    if (!video) {
      throw new ApiError(404, "Video not found!");
    }

    const isLikedAllRedy = await Like.find({
      video: videoId,
      likedBy: req.user?._id,
    });

    if (isLikedAllRedy.length == 0) {
      const likeDoc = await Like.create({
        video: videoId,
        likedBy: req.user?._id,
      });
      return res.status(200).json(new ApiResponse(200, {}, "liked video!"));
    } else {
      const deleteDoc = await Like.findByIdAndDelete(isLikedAllRedy[0]._id);
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "remove liked from video!"));
    }
  } catch (error) {
    console.error(`Error fetching video By id : ${error.message}`);
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  try {
    const conditions = { likedBy: userId, tweet: tweetId };
    const like = await Like.findOne(conditions);
    if (!like) {
      const newLike = await Like.create({
        comment: commentId,
        likedBy: userId,
      });
      return res
        .status(200)
        .json(new ApiResponse(201, newLike, "Liked successfully"));
    } else {
      const removeLike = await Like.findOneAndRemove(conditions);
      return res
        .status(200)
        .json(new ApiResponse(201, removeLike, "Removed like successfully"));
    }
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error.message);
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;
  try {
    const conditions = { likedBy: userId, tweet: tweetId };
    const like = await Like.findOne(conditions);

    if (!like) {
      const newLike = await Like.create({
        tweet: tweetId,
        likedBy: userId,
      });
      return res
        .status(200)
        .json(new ApiResponse(201, newLike, "Liked successfully"));
    } else {
      const removeLike = await Like.findOneAndRemove(conditions);
      return res
        .status(200)
        .json(new ApiResponse(201, removeLike, "Removed like successfully"));
    }
  } catch (error) {}
});

const getLikedVideos = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const likedVideos = await Like.find({ likedBy: userId });
    if (!likedVideos) {
      throw new ApiError(404, "No videos found");
    }
    res
      .status(201)
      .json(new ApiResponse(200, likedVideos, "Fetched successfull"));
  } catch (error) {
    console.error(`Error fetching Likes video By user : ${error.message}`);
    throw new ApiError(500, "Something went wrong", error.message);
  }
});


// const getVideoLikes = asyncHandler(async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const userId = req.user._id;
//     const Videoslikescount = await Like.count({ video: videoId });
//     if (!Videoslikescount) {
//       throw new ApiError(404, "No videos Likes found ");
//     }
//     res
//       .status(201)
//       .json(new ApiResponse(200, Videoslikescount, "Video Likes Fetched successfull"));
//   } catch (error) {
//     console.error(`Error fetching Likes count of video By id : ${error.message}`);
//     throw new ApiError(500, "Something went wrong", error.message);
//   }
// });


const getVideoLikes = asyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;

    // Count the number of likes for the given video ID
    const videosLikesCount = await Like.countDocuments({ video: videoId });

    // Check if likes are found
    if (videosLikesCount === 0) {
      return res.status(404).json(new ApiResponse(404, videosLikesCount, "No video likes found"));
    }

    // Return the count of likes
    res.status(200).json(new ApiResponse(200, videosLikesCount, "Video likes fetched successfully"));
  } catch (error) {
    console.error(`Error fetching likes count of video by ID: ${error.message}`);
    throw new ApiError(500, "Something went wrong", error.message);
  }
});



export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    getVideoLikes,
}
